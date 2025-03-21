'use client'

import Footer from '@/components/ui/footer'
import Navbar from '@/components/ui/navbar'
import { H2, P } from '@/components/ui/typography'
import Image from 'next/image'

const images = [
  '/carousel/1.jpeg',
  '/carousel/2.jpeg',
  '/carousel/3.jpeg',
  '/carousel/4.jpeg',
  '/carousel/5.jpeg',
]

const WorkExperience = [
  {
    title: 'Junior Consulting',
    role: 'Technical Consultant',
    date: 'Sept 2024 - Present',
    description:
      'Working as technical consultant at Junior Consulting, where I focus on full-stack development.',
  },
  {
    title: 'Asker Library',
    role: 'Programming Instructor',
    date: 'August 2020 - June 2021',
    description: 'Teaching programming using the no-code tool Scratch.',
  },
  {
    title: 'Norwegian Army',
    role: 'Troop assistant',
    date: 'August 2022 - July 2023',
    description:
      'Troop assistant in the Norwegian Army, supplying necessary equipment and assisting over 60 soldiers.',
  },
]

const HomePage = () => {
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
          <div className="w-full xl:w-1/2 xl:pl-10">
            {images.map((src, index) => (
              <div key={index}>
                <Image
                  src={src}
                  alt={`Carousel image ${index + 1}`}
                  width={500}
                  height={500}
                  className="rounded border border-gray-600"
                />
              </div>
            ))}
          </div>
          <div className="border-b mx-10s my-20 w-full "></div>
          <H2 className="mb-10 w-full">Work Experience</H2>
          <div className="flex flex-wrap -mx-2">
            {WorkExperience.map((job, index) => (
              <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-2 my-2">
                <div
                  className={`min-h-[300px] rounded-lg p-4 mb-4 border hover:bg-primary-foreground flex flex-col justify-between
                    `}
                >
                  <H2>{job.title}</H2>
                  <P>{job.role}</P>
                  <P>{job.date}</P>
                  <P>{job.description}</P>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HomePage
