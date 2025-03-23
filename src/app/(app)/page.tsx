'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Footer from '@/components/ui/footer'
import Navbar from '@/components/ui/navbar'
import { H2, P } from '@/components/ui/typography'
import Image from 'next/image'
import Link from 'next/link'
import { Media, Experience } from '@/payload-types'

// Format date from ISO string to "Month Year" format
function formatDate(dateString: string): string {
  if (!dateString) return ''

  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

async function getImages(): Promise<Media[]> {
  try {
    const payload = await getPayload({ config: configPromise })

    const media = await payload.find({
      collection: 'media',
      depth: 1,
      limit: 12,
      overrideAccess: false,
      pagination: false,
    })
    return media.docs
  } catch (error) {
    console.error('Error fetching Images:', error)
    return []
  }
}

async function getWorkExperience(): Promise<Experience[]> {
  try {
    const payload = await getPayload({ config: configPromise })

    const experience = await payload.find({
      collection: 'experience',
      depth: 1,
      limit: 12,
      overrideAccess: false,
      pagination: false,
    })
    return experience.docs
  } catch (error) {
    console.error('Error fetching work experience:', error)
    return []
  }
}

export default async function HomePage() {
  const workExperience = await getWorkExperience()
  const images = await getImages()

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-20 px-10 lg:px-40 md:px-30">
        <div className="flex flex-col xl:flex-row flex-wrap items-center xl:items-start">
          <div className="width-full xl:w-1/2">
            <H2 className="mb-5 text-6xl">Student, Consultant and Software Developer.</H2>
            <P>
              My name is Peder Brennum, and i am currently studying Computer Science at NTNU and
              working part time as a technical consultant at Junior Consulting. I am passionate
              about creating high-quality solutions to complex problems.{' '}
            </P>
          </div>
          {images.length > 0 && (
            <Carousel className="w-full max-w-[500px] xl:w-1/2 xl:pl-10">
              <CarouselContent>
                {images.map((media, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={media.sizes?.carouselImage?.url || media.url || ''}
                      alt={media.alt || `Carousel image ${index + 1}`}
                      width={500}
                      height={500}
                      className="rounded border border-secondary object-cover w-[500px] h-[500px]"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
          <div className="border-b mx-10s my-20 w-full "></div>
          <H2 className="mb-10 w-full">Work Experience</H2>
          <div className="flex flex-wrap -mx-2">
            {workExperience.map((job: Experience, index: number) => (
              <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-2 my-2">
                {job.slug ? (
                  <Link href={`/experiences/${job.slug}`}>
                    <div
                      className={`min-h-[300px] rounded-lg p-4 mb-4 border hover:bg-primary-foreground flex flex-col justify-between
                      cursor-pointer transition-colors duration-200`}
                    >
                      <H2>{job.Title}</H2>
                      <P>{job.Role}</P>
                      <P>
                        {formatDate(job.StartDate)} -{' '}
                        {job.EndDate ? formatDate(job.EndDate) : 'Present'}
                      </P>
                    </div>
                  </Link>
                ) : (
                  <div
                    className={`min-h-[300px] rounded-lg p-4 mb-4 border flex flex-col justify-between`}
                  >
                    <H2>{job.Title}</H2>
                    <P>{job.Role}</P>
                    <P>
                      {formatDate(job.StartDate)} -{' '}
                      {job.EndDate ? formatDate(job.EndDate) : 'Present'}
                    </P>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
