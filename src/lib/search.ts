import { prisma } from './prisma'

interface SearchResult {
  type: 'task' | 'note'
  id: string
  taskId: string
  title: string
  content: string | null
  taskTitle?: string
  snippet: string
  updatedAt: Date
}

export async function searchContent(query: string): Promise<SearchResult[]> {
  if (!query.trim()) {
    return []
  }

  const searchTerm = `%${query.toLowerCase()}%`

  const tasks = await prisma.task.findMany({
    where: {
      OR: [
        { title: { contains: query } },
        { description: { contains: query } },
      ],
    },
    orderBy: { updatedAt: 'desc' },
    take: 20,
  })

  const notes = await prisma.note.findMany({
    where: {
      OR: [
        { title: { contains: query } },
        { content: { contains: query } },
      ],
    },
    include: { task: true },
    orderBy: { updatedAt: 'desc' },
    take: 20,
  })

  const taskResults: SearchResult[] = tasks.map((task) => ({
    type: 'task' as const,
    id: task.id,
    taskId: task.id,
    title: task.title,
    content: task.description,
    snippet: createSnippet(task.description ?? '', query),
    updatedAt: task.updatedAt,
  }))

  const noteResults: SearchResult[] = notes.map((note) => ({
    type: 'note' as const,
    id: note.id,
    taskId: note.taskId,
    title: note.title,
    content: note.content,
    taskTitle: note.task.title,
    snippet: createSnippet(note.content, query),
    updatedAt: note.updatedAt,
  }))

  const allResults = [...taskResults, ...noteResults]
  allResults.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())

  return allResults.slice(0, 30)
}

function createSnippet(text: string, query: string, maxLength = 150): string {
  if (!text) return ''

  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const index = lowerText.indexOf(lowerQuery)

  if (index === -1) {
    return text.slice(0, maxLength) + (text.length > maxLength ? '...' : '')
  }

  const start = Math.max(0, index - 50)
  const end = Math.min(text.length, index + query.length + 100)

  let snippet = text.slice(start, end)

  if (start > 0) snippet = '...' + snippet
  if (end < text.length) snippet = snippet + '...'

  return snippet
}

export async function initializeFTS() {
  try {
    await prisma.$executeRawUnsafe(`
      CREATE VIRTUAL TABLE IF NOT EXISTS tasks_fts USING fts5(
        id,
        title,
        description,
        content='Task',
        content_rowid='rowid'
      );
    `)

    await prisma.$executeRawUnsafe(`
      CREATE VIRTUAL TABLE IF NOT EXISTS notes_fts USING fts5(
        id,
        title,
        content,
        content='Note',
        content_rowid='rowid'
      );
    `)

    await rebuildFTSIndex()
  } catch (error) {
    // FTS5 might not be available in all SQLite builds
    // Fall back to LIKE-based search
  }
}

export async function rebuildFTSIndex() {
  try {
    await prisma.$executeRawUnsafe(`DELETE FROM tasks_fts;`)
    await prisma.$executeRawUnsafe(`
      INSERT INTO tasks_fts(id, title, description)
      SELECT id, title, COALESCE(description, '') FROM Task;
    `)

    await prisma.$executeRawUnsafe(`DELETE FROM notes_fts;`)
    await prisma.$executeRawUnsafe(`
      INSERT INTO notes_fts(id, title, content)
      SELECT id, title, COALESCE(content, '') FROM Note;
    `)
  } catch (error) {
    // Silently fail if FTS tables don't exist
  }
}

export async function searchWithFTS(query: string): Promise<SearchResult[]> {
  if (!query.trim()) {
    return []
  }

  try {
    const ftsQuery = query.split(/\s+/).map((term) => `"${term}"*`).join(' ')

    const taskResults = await prisma.$queryRawUnsafe<
      Array<{
        id: string
        title: string
        description: string | null
        updatedAt: Date
        snippet: string
      }>
    >(`
      SELECT
        t.id,
        t.title,
        t.description,
        t.updatedAt,
        snippet(tasks_fts, 2, '<mark>', '</mark>', '...', 32) as snippet
      FROM tasks_fts
      JOIN Task t ON tasks_fts.id = t.id
      WHERE tasks_fts MATCH ?
      ORDER BY rank
      LIMIT 20
    `, ftsQuery)

    const noteResults = await prisma.$queryRawUnsafe<
      Array<{
        id: string
        taskId: string
        title: string
        content: string
        taskTitle: string
        updatedAt: Date
        snippet: string
      }>
    >(`
      SELECT
        n.id,
        n.taskId,
        n.title,
        n.content,
        t.title as taskTitle,
        n.updatedAt,
        snippet(notes_fts, 2, '<mark>', '</mark>', '...', 32) as snippet
      FROM notes_fts
      JOIN Note n ON notes_fts.id = n.id
      JOIN Task t ON n.taskId = t.id
      WHERE notes_fts MATCH ?
      ORDER BY rank
      LIMIT 20
    `, ftsQuery)

    const results: SearchResult[] = [
      ...taskResults.map((t) => ({
        type: 'task' as const,
        id: t.id,
        taskId: t.id,
        title: t.title,
        content: t.description,
        snippet: t.snippet || createSnippet(t.description ?? '', query),
        updatedAt: t.updatedAt,
      })),
      ...noteResults.map((n) => ({
        type: 'note' as const,
        id: n.id,
        taskId: n.taskId,
        title: n.title,
        content: n.content,
        taskTitle: n.taskTitle,
        snippet: n.snippet || createSnippet(n.content, query),
        updatedAt: n.updatedAt,
      })),
    ]

    return results.slice(0, 30)
  } catch {
    return searchContent(query)
  }
}
