import type React from 'react'
import type { Page, Post } from '@/payload-types'

import { getCachedDocument } from '@/utilities/getDocument'
import { getCachedRedirects } from '@/utilities/getRedirects'
import { notFound, redirect } from 'next/navigation'

type RelationTo = 'pages' | 'posts' | string

type Reference = {
  relationTo: RelationTo
  value: string | { slug: string }
}

type RedirectTo = {
  reference?: Reference
  url?: string
}

type RedirectItem = {
  to?: RedirectTo
  from: string
}

interface Props {
  disableNotFound?: boolean
  url: string
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound, url }) => {
  const redirects = (await getCachedRedirects()()) as RedirectItem[]

  const redirectItem = redirects.find((redirect) => redirect.from === url)

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(redirectItem.to.url)
    }

    let redirectUrl: string

    if (typeof redirectItem.to?.reference?.value === 'string') {
      const collection = redirectItem.to?.reference?.relationTo as 'pages' | 'posts'
      const id = redirectItem.to?.reference?.value

      const document = (await getCachedDocument(collection, id)()) as Page | Post

      // Fix the type comparison with a type assertion
      redirectUrl = `${
        (redirectItem.to?.reference?.relationTo as RelationTo) !== 'pages'
          ? `/${redirectItem.to?.reference?.relationTo}`
          : ''
      }/${document?.slug}`
    } else {
      // Fix the type comparison here too
      redirectUrl = `${
        (redirectItem.to?.reference?.relationTo as RelationTo) !== 'pages'
          ? `/${redirectItem.to?.reference?.relationTo}`
          : ''
      }/${
        typeof redirectItem.to?.reference?.value === 'object'
          ? redirectItem.to?.reference?.value?.slug
          : ''
      }`
    }

    if (redirectUrl) redirect(redirectUrl)
  }

  if (disableNotFound) return null

  notFound()
}
