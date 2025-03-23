'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { Post } from '@/payload-types'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    pagination: false,
    sort: '-publishedAt',
    select: {
      title: true,
      slug: true,
      content: true,
      publishedAt: true,
    },
  })

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground">Latest articles and updates</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.docs?.length > 0 ? (
            posts.docs.map((post, index) => {
              const typedPost = post as Post
              return (
                <Link href={`/blog/${typedPost.slug}`} key={index}>
                  <div className="min-h-[300px] rounded-lg p-4 mb-4 border hover:bg-primary-foreground flex flex-col justify-between cursor-pointer transition-colors duration-200 h-full">
                    <div>
                      <h2 className="text-2xl font-semibold">{typedPost.title}</h2>
                      {typedPost.publishedAt && (
                        <p className="text-muted-foreground">
                          {new Date(typedPost.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      )}
                    </div>
                    <div className="line-clamp-3 my-4">
                      <RichText
                        data={typedPost.content}
                        enableProse={false}
                        className="text-muted-foreground"
                      />
                    </div>
                    <div>
                      <span className="text-sm font-medium">Read More</span>
                    </div>
                  </div>
                </Link>
              )
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <h2 className="text-2xl font-bold mb-2">No posts yet</h2>
              <p className="text-muted-foreground">Check back later for new content</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
