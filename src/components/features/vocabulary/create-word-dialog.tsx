'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createVocabWord } from '@/actions/vocab-words'

interface CategoryOption {
  id: string
  name: string
  nameZh: string
}

interface CreateWordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  language: string
  categories: CategoryOption[]
  defaultCategoryId?: string | null
  onSuccess: () => void
}

export function CreateWordDialog({
  open,
  onOpenChange,
  language,
  categories,
  defaultCategoryId,
  onSuccess,
}: CreateWordDialogProps) {
  const t = useTranslations('vocabulary')
  const tCommon = useTranslations('common')
  const [word, setWord] = useState('')
  const [reading, setReading] = useState('')
  const [meaning, setMeaning] = useState('')
  const [phonetic, setPhonetic] = useState('')
  const [example, setExample] = useState('')
  const [categoryId, setCategoryId] = useState(defaultCategoryId ?? categories[0]?.id ?? '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!word.trim() || !meaning.trim() || !categoryId) return

    setIsSubmitting(true)
    try {
      const result = await createVocabWord({
        word: word.trim(),
        reading: reading.trim() || null,
        meaning: meaning.trim(),
        phonetic: phonetic.trim() || null,
        exampleSentence: example.trim() || null,
        language: language as 'en' | 'ja',
        categoryId,
      })

      if (result.success) {
        setWord('')
        setReading('')
        setMeaning('')
        setPhonetic('')
        setExample('')
        onOpenChange(false)
        onSuccess()
      }
    } catch (error) {
      // Error handled by server action
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('addWord')}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="word">{t('word')}</Label>
            <Input
              id="word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder={language === 'ja' ? '食べる' : 'apple'}
            />
          </div>

          {language === 'ja' && (
            <div className="space-y-2">
              <Label htmlFor="reading">{t('reading')}</Label>
              <Input
                id="reading"
                value={reading}
                onChange={(e) => setReading(e.target.value)}
                placeholder="たべる"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="meaning">{t('meaning')}</Label>
            <Input
              id="meaning"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              placeholder={language === 'ja' ? '吃' : '苹果'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phonetic">{t('phonetic')}</Label>
            <Input
              id="phonetic"
              value={phonetic}
              onChange={(e) => setPhonetic(e.target.value)}
              placeholder={language === 'ja' ? 'taberu' : '/ˈæp.əl/'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="example">{t('example')}</Label>
            <Input
              id="example"
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder={language === 'ja' ? '毎日ご飯を食べる。' : 'I eat an apple every day.'}
            />
          </div>

          <div className="space-y-2">
            <Label>{t('category')}</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder={t('selectCategory')} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {tCommon('cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting || !word.trim() || !meaning.trim() || !categoryId}>
              {tCommon('create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
