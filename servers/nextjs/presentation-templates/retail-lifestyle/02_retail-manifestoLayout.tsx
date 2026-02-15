import React from 'react'
import * as z from 'zod'


export const layoutId = "retail-manifesto"
export const layoutName = "02. Brand Manifesto"
export const layoutDescription = "Large centered typography."

export const Schema = z.object({
    heading: z.string().default("We believe in..."),
    manifesto: z.string().default("Creating fashion that respects the people who make it and the planet we share. We are redefining modern luxury through transparency, craft, and circularity."),

    signature_text: z.string().default("The Urban Thread Team"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Mulish:wght@400;700&family=La+Belle+Aurore&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fff7ed] p-24 text-center flex flex-col justify-center items-center"
                style={{
                    fontFamily: "'Mulish', sans-serif",
                }}
            >
                <div className="text-[#c2410c] font-bold uppercase tracking-[0.3em] mb-12 relative inline-block">
                    {data?.heading}
                    {/* Decorative underline */}
                    <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#fcd34d]" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                    </svg>
                </div>

                <h2 className="text-5xl text-[#44403c] leading-snug font-serif max-w-4xl mx-auto mb-16" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    "{data?.manifesto}"
                </h2>

                {/* Hand drawn heart icon */}
                <div className="mb-4 text-[#ec4899] text-4xl">♥</div>

                <div className="font-handwriting text-3xl text-[#57534e] rotate-[-2deg]" style={{ fontFamily: "'La Belle Aurore', cursive" }}>
                    {data?.signature_text}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
