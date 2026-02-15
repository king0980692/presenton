import React from 'react'
import * as z from 'zod'


export const layoutId = "retail-genz"
export const layoutName = "05. Gen Z Consumers"
export const layoutDescription = "Infographic for target audience."

export const Schema = z.object({
    title: z.string().default("Capturing Gen Z"),

    stat_1: z.string().default("75%"),
    desc_1: z.string().default("Prioritize sustainability over brand name."),
    stat_2: z.string().default("3x"),
    desc_2: z.string().default("More likely to buy second-hand."),

    bg_color: z.string().default("#fbcfe8"), // Pink-ish
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden text-[#1c1917] flex"
                style={{
                    fontFamily: "'Mulish', sans-serif",
                    backgroundColor: data?.bg_color
                }}
            >
                <div className="w-full p-20 flex flex-col items-center justify-center text-center">
                    <div className="inline-block bg-black text-white px-4 py-1 text-xs font-bold uppercase tracking-widest mb-8 rounded-full">Consumer Insight</div>

                    <h2 className="text-6xl font-serif italic mb-16" style={{ fontFamily: "'DM Serif Display', serif" }}>
                        {data?.title}
                    </h2>

                    <div className="flex gap-20">
                        <div className="w-80">
                            <div className="text-9xl font-black mb-4 tracking-tighter text-[#be185d]">{data?.stat_1}</div>
                            <p className="text-xl font-bold leading-tight">{data?.desc_1}</p>
                        </div>

                        <div className="w-[2px] bg-black/10"></div>

                        <div className="w-80">
                            <div className="text-9xl font-black mb-4 tracking-tighter text-[#be185d]">{data?.stat_2}</div>
                            <p className="text-xl font-bold leading-tight">{data?.desc_2}</p>
                        </div>
                    </div>
                </div>

                {/* Decorative shapes */}
                <div className="absolute top-10 left-10 text-6xl opacity-50 rotate-12">✨</div>
                <div className="absolute bottom-10 right-10 text-6xl opacity-50 -rotate-12">✌️</div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
