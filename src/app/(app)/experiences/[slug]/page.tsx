'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import RichText from '@/components/RichText'
import { notFound } from 'next/navigation'
import { Experience } from '@/payload-types'

type Props = {
  params: {
    slug: string
  }
}

export default async function Page({ params }: Props) {
  const { slug } = params
  const payload = await getPayload({ config: configPromise })

  const experience = await payload.find({
    collection: 'experience',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
    limit: 1,
  })

  if (!experience.docs || experience.docs.length === 0) {
    return notFound()
  }

  const experienceData = experience.docs[0] as Experience

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{experienceData.Title}</h1>
            {experienceData.Role && (
              <div className="text-xl text-muted-foreground mb-2">{experienceData.Role}</div>
            )}
            {experienceData.StartDate && (
              <time className="text-muted-foreground">
                {new Date(experienceData.StartDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })}
                {experienceData.EndDate
                  ? ` - ${new Date(experienceData.EndDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}`
                  : ' - Present'}
              </time>
            )}
          </header>

          <div className="prose dark:prose-invert prose-lg max-w-none">
            <RichText data={experienceData.Description} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
