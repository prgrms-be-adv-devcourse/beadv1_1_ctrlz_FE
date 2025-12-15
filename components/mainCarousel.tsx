"use client"

import React, { useRef } from "react"
import Autoplay from "embla-carousel-autoplay"
import carousel1 from '@/public/carousel/carousel1.png'
import carousel2 from '@/public/carousel/carousel2.png'
import carousel3 from '@/public/carousel/carousel3.png'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// 메인 카로셀 설정값 타입
interface MainCarouselProps {
  height?: string
  width?: string
  autoplayDelay?: number
}

const MainCarousel = ({
  height = "h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] max-h-[400px]",
  width = "w-full sm:w-[95%] md:w-[80%] lg:w-[70%] xl:w-[60%]",
  autoplayDelay = 4000,       // 4초 자동 슬라이드
}: MainCarouselProps) => {
  const autoplay = useRef(
    Autoplay({
      delay: autoplayDelay,
      stopOnInteraction: false,
    })
  )

  const images = [
    carousel1,
    carousel2,
    carousel3
  ]

  return (
    <div className={`mx-auto ${width}`}>
      <Carousel
        opts={{
          loop: true,
          align: "center",
        }}
        plugins={[autoplay.current]}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className={`flex justify-center items-center ${height} mt-2 sm:mt-4 md:mt-6`}
            >
              <img
                src={image.src}
                alt={`main-${index}`}
                className="w-full h-full object-contain md:object-cover rounded-xl"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  )
}

export default MainCarousel
