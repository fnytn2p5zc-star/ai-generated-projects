import { NextRequest, NextResponse } from 'next/server'
import { searchContent } from '@/lib/search'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')

  if (!query || !query.trim()) {
    return NextResponse.json({ success: true, data: [] })
  }

  try {
    const results = await searchContent(query)
    return NextResponse.json({ success: true, data: results })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Search failed' },
      { status: 500 }
    )
  }
}
