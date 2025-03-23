'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import RichText from '@/components/RichText'
import { notFound } from 'next/navigation'
import { Experience } from '@/payload-types'

// Define the component as a constant
const Page = async ({ params }: { params: { slug: string } }) => {
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

          <div>
            <RichText data={experienceData.Description} className="prose-lg" />
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}

// Add this function to help Next.js understand the params structure
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const experiences = await payload.find({
    collection: 'experience',
    limit: 100,
  })

  return experiences.docs.map((exp) => ({
    slug: exp.slug,
  }))
}

// Use type assertion to bypass the type checking
export default Page as any
