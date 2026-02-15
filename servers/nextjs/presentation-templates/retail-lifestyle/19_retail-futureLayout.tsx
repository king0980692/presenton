import React from 'react'
import * as z from 'zod'


export const layoutId = "retail-future"
export const layoutName = "19. Future Collection"
export const layoutDescription = "Teaser for upcoming season."

export const Schema = z.object({
    title: z.string().default("Coming 2025: Desert Drift"),

    description: z.string().default("Inspired by arid landscapes and resilient flora. 100% natural dyes."),

    bg_image: z.string().url().default("https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Mulish:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-black text-[#fef3c7]"
                style={{
                    fontFamily: "'Mulish', sans-serif",
                }}
            >
                <img src={data?.bg_image} className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                <div className="relative z-10 w-full h-full flex flex-col justify-end p-20 text-center">
                    <h2 className="text-6xl font-serif italic mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>
                        {data?.title}
                    </h2>
                    <div className="w-24 h-1 bg-[#fef3c7] mx-auto mb-6"></div>
                    <p className="text-xl font-light tracking-wide uppercase">
                        {data?.description}
                    </p>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
