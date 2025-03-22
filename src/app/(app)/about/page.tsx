'use client'

import Footer from '@/components/ui/footer'
import Navbar from '@/components/ui/navbar'
import { H2, P } from '@/components/ui/typography'
import Image from 'next/image'

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className={`container mx-auto my-20 px-10 xl:px-40 md:px-30 `}>
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <Image
              src="/media/peder.jpg"
              alt="Peder Brennum"
              width={500}
              height={500}
              className="rounded border border-gray-600"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <H2 className="mb-4">Hello there!</H2>
            <P className="mb-4">
              My name is Peder Brennum, and I’m currently studying Computer Science at NTNU. 📚
            </P>
            <P className="mb-4">
              I have experience from both the workplace and volunteer roles. At the moment, I’m
              working as a tech consultant at Junior Consulting, where I focus on full-stack
              development. Previously, I worked as a programming instructor at Asker Library,
              teaching programming using the no-code tool Scratch. 💻
            </P>
            <P className="mb-4">
              I’ve held several volunteer positions related to my studies in the student association
              Abakus. For example, I’ve been a project coordinator in the corporate committee and
              the event manager for Abakus’ charitable association. These roles have provided me
              with valuable experience in project management, teamwork, and organization. 🤝
              Additionally, I’ve been a host on the podcast Tekpodden, where we’ve talked with
              various technologists from the industry about exciting topics.
            </P>
            <P className="mb-4">
              I have skills in object-oriented programming, full-stack web development, and backend
              development. I enjoy taking responsibility and creating value through both
              professional and social initiatives, and I’m always looking for new challenges that
              can contribute to my growth. 🚀
            </P>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutPage
