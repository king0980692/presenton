import React from 'react'
import * as z from 'zod'


export const layoutId = "hosp-reviews"
export const layoutName = "13. Guest Experience"
export const layoutDescription = "Review stars."

export const Schema = z.object({
    score: z.string().default("4.9"),
    source: z.string().default("Guest Satisfaction Score"),
    quote: z.string().default("The most eco-conscious luxury stay I've ever experienced. Truly inspiring."),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-20 flex flex-col items-center justify-center"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="flex items-center gap-4 text-[#fbbf24] text-6xl mb-12">
                    ★ ★ ★ ★ ★
                </div>

                <div className="text-center max-w-4xl">
                    <p className="text-5xl font-serif italic text-gray-800 leading-snug mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
                        "{data?.quote}"
                    </p>

                    <div className="flex flex-col items-center border-t border-gray-200 pt-12">
                        <div className="text-6xl font-light text-gray-900 mb-2">{data?.score}/5.0</div>
                        <div className="uppercase tracking-widest text-xs text-gray-400">{data?.source}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
