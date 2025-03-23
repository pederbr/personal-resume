'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import RichText from '@/components/RichText'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
                <Card key={index} className="flex flex-col h-full">
                  <CardHeader>
                    <CardTitle>{typedPost.title}</CardTitle>
                    {typedPost.publishedAt && (
                      <CardDescription>
                        {new Date(typedPost.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="line-clamp-3">
                      <RichText data={typedPost.content} enableProse={false} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline">
                      <Link href={`/blog/${typedPost.slug}`}>Read More</Link>
                    </Button>
                  </CardFooter>
                </Card>
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
