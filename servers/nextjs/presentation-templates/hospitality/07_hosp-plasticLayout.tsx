import React from 'react'
import * as z from 'zod'


export const layoutId = "hosp-plastic"
export const layoutName = "07. Plastic Free"
export const layoutDescription = "Minimal product photo."

export const Schema = z.object({
    title: z.string().default("Plastic Free"),

    list: z.array(z.string()).min(3).max(3).default([
        "Glass Water Bottles",
        "Bamboo Toothbrushes",
        "Bulk Amenities",
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#e0f2fe] flex flex-col items-center justify-center p-20"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <h2 className="text-6xl text-[#0c4a6e] mb-16 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {data?.title}
                </h2>

                <div className="flex gap-16">
                    {(data?.list || []).map((item, idx) => (
                        <div key={idx} className="bg-white/60 p-12 rounded-full w-64 h-64 flex flex-col items-center justify-center text-center shadow-lg backdrop-blur-sm border border-white">
                            <div className="text-4xl mb-4 text-[#0ea5e9]">
                                {idx === 0 && "💧"}
                                {idx === 1 && "🪥"}
                                {idx === 2 && "🧴"}
                            </div>
                            <div className="text-[#0c4a6e] font-bold text-lg">{item}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
