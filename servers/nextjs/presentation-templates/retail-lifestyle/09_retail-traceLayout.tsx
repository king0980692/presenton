import React from 'react'
import * as z from 'zod'


export const layoutId = "retail-trace"
export const layoutName = "09. Transparent Supply Chain"
export const layoutDescription = "Map focusing on makers."

export const Schema = z.object({
    title: z.string().default("Who Made My Clothes?"),

    fact: z.string().default("100% of our Tier 1 factories are published online with full audit reports."),

    makers: z.array(z.string()).min(3).max(3).default([
        "Organic Cotton / India",
        "Weaving Mill / Portugal",
        "Assembly / Vietnam",
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
                href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Mulish:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#78350f] text-[#fef3c7]"
                style={{
                    fontFamily: "'Mulish', sans-serif",
                }}
            >
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center"></div>

                <div className="relative z-10 p-20 flex flex-col h-full justify-between">
                    <h2 className="text-6xl font-serif italic" style={{ fontFamily: "'DM Serif Display', serif" }}>
                        {data?.title}
                    </h2>

                    <div className="w-1/2 bg-[#fef3c7] text-[#78350f] p-8 rounded-tr-[50px] rounded-bl-[50px] shadow-2xl">
                        <p className="text-xl font-bold leading-relaxed">
                            "{data?.fact}"
                        </p>
                    </div>

                    <div className="flex gap-4 self-end">
                        {(data?.makers || []).map((m, idx) => (
                            <div key={idx} className="bg-black/30 backdrop-blur p-4 rounded text-sm font-bold border border-[#fef3c7]/30">
                                📍 {m}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
