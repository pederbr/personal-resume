import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import RichText from '@/components/RichText'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'blogposts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    pagination: false,
    select: {
      title: true,
      slug: true,
      content: true,
    },
  })

  return (
    <>
      <Navbar />
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {posts.docs?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <h2 className="text-2xl font-bold">{result.title}</h2>
                  <RichText content={result.content} />
                </div>
              )
            } else
              return (
                <div className="col-span-4" key={index}>
                  <h2 className="text-2xl font-bold">No title</h2>
                  <p>No posts found</p>
                </div>
              )

            return null
          })}
        </div>
      </div>
      <Footer />
    </>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
