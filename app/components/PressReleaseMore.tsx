"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import InsightsSection from "@/app/components/service/InsightsSection"
import FooterSimple from "@/app/components/FooterSimple"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import type { PressRelease } from "@/lib/types/pressRelease"
import { formatDate } from "@/lib/utils/dateFormatter"

interface PressReleaseMoreProps {
  pressReleaseId?: string
}

const PressReleaseMore = ({ pressReleaseId }: PressReleaseMoreProps) => {
  const router = useRouter()
  const [pressRelease, setPressRelease] = useState<PressRelease | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedPressReleases, setRelatedPressReleases] = useState<PressRelease[]>([])

  useEffect(() => {
    if (!pressReleaseId) {
      setLoading(false)
      return
    }

    const fetchPressRelease = async () => {
      setLoading(true)

      // Fetch the main press release
      const { data, error } = await supabase
        .from('press_releases')
        .select('*')
        .eq('id', pressReleaseId)
        .single()

      if (error || !data) {
        console.error('Error fetching press release:', error)
        router.push('/pressRelease')
        return
      }

      setPressRelease(data)

      // Fetch related press releases (same category, excluding current)
      const { data: related } = await supabase
        .from('press_releases')
        .select('*')
        .eq('category', data.category)
        .neq('id', pressReleaseId)
        .limit(3)

      setRelatedPressReleases(related || [])
      setLoading(false)
    }

    fetchPressRelease()
  }, [pressReleaseId, router])

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return `${minutes} Min${minutes > 1 ? 's' : ''} Read`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#FE4B00]"></div>
      </div>
    )
  }

  if (!pressRelease) {
    return null
  }

  return (
    <div className="w-full min-h-screen">
      {/* Header */}
      <div className="w-full px-4 sm:px-6 md:px-10 pt-8 sm:pt-12 pb-8 flex flex-col items-center">
        <p className="text-base sm:text-xl text-center mb-4 sm:mb-6">PRESS RELEASE</p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-center mb-4 sm:mb-6 max-w-5xl px-2">
          {pressRelease.title}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-7 text-xs sm:text-sm md:text-base" style={{ color: '#757575' }}>
          <span className="flex items-center gap-2">
            <Image src="/Images/mins.png" alt="" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
            {calculateReadTime(pressRelease.content)}
          </span>
          <span className="flex items-center gap-2">
            <Image src="/Images/claendar.png" alt="" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
            {formatDate(pressRelease.published_date)}
          </span>
        </div>
        <div className="w-[85%] sm:w-[65%] h-[1px] mt-4 sm:mt-6 mx-auto" style={{ backgroundColor: '#E3E3E3' }}></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pb-12">
        {/* Cover Image */}
        {pressRelease.cover_image_url && (
          <Image
            src={pressRelease.cover_image_url}
            alt={pressRelease.title}
            width={1000}
            height={400}
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover mb-6 sm:mb-8 rounded-lg"
          />
        )}

        {/* Press Release Content */}
        <article className="prose prose-lg max-w-none">
          <div
            className="text-[#212121] leading-relaxed text-base sm:text-lg"
            dangerouslySetInnerHTML={{ __html: pressRelease.content }}
          />
        </article>

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-[#212121]">Share this press release</h3>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: pressRelease.title,
                    text: pressRelease.description,
                    url: window.location.href,
                  })
                } else {
                  navigator.clipboard.writeText(window.location.href)
                  alert('Link copied to clipboard!')
                }
              }}
              className="px-4 py-2 bg-[#FE4B00] text-white rounded hover:bg-[#E54300] transition-colors text-sm"
            >
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Related Press Releases */}
      {relatedPressReleases.length > 0 && (
        <InsightsSection
          title="More"
          titleHighlight="Stories"
          buttonText=""
          onButtonClick={() => router.push('/pressRelease')}
          insights={relatedPressReleases.map((pr) => ({
            imageSrc: pr.cover_image_url || "/Images/insights1.png",
            title: pr.title,
            category: pr.category,
            date: formatDate(pr.published_date),
            readTime: calculateReadTime(pr.content),
            imageAlt: pr.title,
            onClick: () => router.push(`/pressRelease?id=${pr.id}`)
          }))}
        />
      )}

      <div className="w-full py-12 sm:py-16 md:py-20">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-0">
          <div className="flex flex-col justify-center items-start gap-6 sm:gap-8 lg:w-1/2 bg-[#F5F9FE] px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
            <h2 className="text-[#000A1B] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium leading-tight">
              Need a Tech Partner You Can Trust?
            </h2>
            <button
              onClick={() => router.push('/contact')}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-sm text-white text-sm sm:text-base"
              style={{ backgroundColor: '#FF662A' }}
            >
              Get Started
            </button>
          </div>
          <div className="lg:w-1/2 h-[250px] sm:h-[300px] lg:h-auto">
            <Image
              src="/Images/insightsfooter.png"
              alt="Insights Footer"
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <FooterSimple />
    </div>
  )
}

export default PressReleaseMore
