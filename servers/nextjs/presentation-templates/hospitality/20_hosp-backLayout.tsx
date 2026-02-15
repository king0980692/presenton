import React from 'react'
import * as z from 'zod'


export const layoutId = "hosp-back"
export const layoutName = "20. Back Cover"
export const layoutDescription = "Minimal end page."

export const Schema = z.object({
    company: z.string().default("SERENITY DOJO"),
    cta: z.string().default("Book Your Conscious Stay"),
    web: z.string().default("serenity-dojo.com"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#292524] text-white flex flex-col items-center justify-center p-20"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="mb-20">
                    <div className="w-16 h-16 border border-white rotate-45 mx-auto"></div>
                </div>

                <h2 className="text-3xl font-light tracking-[0.2em] mb-8 uppercase">
                    {data?.company}
                </h2>

                <div className="text-5xl font-serif italic mb-12 text-[#d6d3d1]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {data?.cta}
                </div>

                <div className="text-[#a8a29e] tracking-widest uppercase hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white pb-1">
                    {data?.web}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
