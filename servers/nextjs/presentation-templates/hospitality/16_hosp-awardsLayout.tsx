import React from 'react'
import * as z from 'zod'


export const layoutId = "hosp-awards"
export const layoutName = "16. Awards"
export const layoutDescription = "Text list."

export const Schema = z.object({
    title: z.string().default("Recognition"),

    awards: z.array(z.string()).min(3).max(3).default([
        "World Travel Awards 2023 - Leading Green Hotel",
        "Condé Nast Traveler - Gold List 2024",
        "Sustainable Luxury Award - 5 Star Rating",
    ]),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0c0a09] text-[#e7e5e4] p-20 flex flex-col items-center justify-center text-center"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="w-px h-24 bg-[#a8a29e] mb-12 opacity-50"></div>

                <h2 className="text-5xl mb-20 italic font-serif" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {data?.title}
                </h2>

                <ul className="space-y-12">
                    {(data?.awards || []).map((award, idx) => (
                        <li key={idx} className="text-2xl font-light tracking-wide max-w-2xl mx-auto">
                            {award}
                        </li>
                    ))}
                </ul>

                <div className="w-px h-24 bg-[#a8a29e] mt-20 opacity-50"></div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
