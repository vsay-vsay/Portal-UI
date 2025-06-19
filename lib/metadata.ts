import type { Metadata } from 'next'

export function generatePageMetadata({
  title,
  description,
  keywords,
  baseTitle = 'Your App Name',
}: {
  title: string
  description?: string
  keywords?: string[]
  baseTitle?: string
}): Metadata {
  return {
    title: `${title} | ${baseTitle}`,
    description: description || '',
    keywords: keywords?.join(', '),
    openGraph: {
      title: `${title} | ${baseTitle}`,
      description: description || '',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${baseTitle}`,
      description: description || '',
    },
  }
}
