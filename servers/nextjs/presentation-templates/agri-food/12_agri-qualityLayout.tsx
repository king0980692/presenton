import React from 'react'
import * as z from 'zod'


export const layoutId = "agri-quality"
export const layoutName = "12. Food Safety"
export const layoutDescription = "Badge grid."

export const Schema = z.object({
    title: z.string().default("Quality First"),

    badges: z.array(z.string()).min(3).max(3).default([
        "GFSI Certified",
        "Non-GMO Verified",
        "Organic Standard",
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
                href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,700;1,300&family=Open+Sans:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#4ade80] flex flex-col items-center justify-center p-20"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <h2 className="text-5xl font-bold mb-20 text-[#14532d]" style={{ fontFamily: "'Merriweather', serif" }}>
                    {data?.title}
                </h2>

                <div className="flex gap-16">
                    {(data?.badges || []).map((badge, idx) => (
                        <div key={idx} className="bg-white/90 w-64 h-64 rounded-full flex flex-col items-center justify-center text-center p-8 shadow-xl border-8 border-[#16a34a]">
                            <div className="text-4xl mb-4">✓</div>
                            <div className="font-bold text-[#14532d] uppercase text-lg">{badge}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
