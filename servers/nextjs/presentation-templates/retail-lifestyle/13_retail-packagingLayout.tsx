import React from 'react'
import * as z from 'zod'


export const layoutId = "retail-packaging"
export const layoutName = "13. Packaging"
export const layoutDescription = "Before and after illustration."

export const Schema = z.object({
    title: z.string().default("Unboxing Better"),

    old: z.string().default("Plastic Polybags"),
    nnew: z.string().default("Compostable Cassava"),

    reduction: z.string().default("-40 Tons of Plastic"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#dcfce7] text-[#14532d] flex flex-col p-16"
                style={{
                    fontFamily: "'Mulish', sans-serif",
                }}
            >
                <h2 className="text-4xl font-serif text-center mb-16" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    {data?.title}
                </h2>

                <div className="flex items-center justify-center gap-20">
                    <div className="w-80 p-8 bg-white/50 rounded-2xl text-center opacity-50 relative grayscale">
                        <div className="text-6xl mb-6">🗑️</div>
                        <div className="font-bold line-through text-gray-500">{data?.old}</div>
                        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs px-2 py-1 uppercase font-bold transform -rotate-12">Out</div>
                    </div>

                    <div className="text-4xl font-bold">→</div>

                    <div className="w-80 p-12 bg-white rounded-2xl text-center shadow-xl relative border-4 border-[#22c55e]">
                        <div className="text-6xl mb-6">📦</div>
                        <div className="font-bold text-xl">{data?.nnew}</div>
                        <div className="absolute top-4 right-4 bg-[#22c55e] text-white text-xs px-2 py-1 uppercase font-bold transform rotate-12">New</div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-block bg-[#15803d] text-white px-8 py-3 rounded-full text-2xl font-bold shadow-lg">
                        {data?.reduction}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
