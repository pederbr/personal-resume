import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import RichText from '@/components/RichText'
import { notFound } from 'next/navigation'
import { Post } from '@/payload-types'

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const payload = await getPayload({ config: configPromise })

  const post = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
    limit: 1,
  })

  if (!post.docs || post.docs.length === 0) {
    return notFound()
  }

  const postData = post.docs[0] as Post

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{postData.title}</h1>
            {postData.publishedAt && (
              <time className="text-muted-foreground">
                {new Date(postData.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
          </header>

          <div>
            <RichText data={postData.content} className="prose-lg" />
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
