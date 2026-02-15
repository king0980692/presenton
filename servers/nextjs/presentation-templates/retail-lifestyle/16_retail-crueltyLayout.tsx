import React from 'react'
import * as z from 'zod'


export const layoutId = "retail-cruelty"
export const layoutName = "16. Cruelty Free"
export const layoutDescription = "Cute animal icon style."

export const Schema = z.object({
    title: z.string().default("Forever Cruelty Free"),

    labels: z.array(z.string()).min(3).max(3).default([
        "PETA Approved",
        "Leaping Bunny Certified",
        "100% Vegan Materials",
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white flex"
                style={{
                    fontFamily: "'Mulish', sans-serif",
                }}
            >
                <div className="w-1/2 bg-[#fdf2f8] flex items-center justify-center p-20">
                    <div className="text-[200px]">🐇</div>
                </div>

                <div className="w-1/2 p-24 flex flex-col justify-center">
                    <h2 className="text-5xl font-serif text-[#be185d] mb-12 leading-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
                        {data?.title}
                    </h2>

                    <div className="space-y-6">
                        {(data?.labels || []).map((label, idx) => (
                            <div key={idx} className="bg-white border-2 border-[#fbcfe8] px-6 py-4 rounded-full text-lg font-bold text-[#9d174d] shadow-sm flex items-center gap-3">
                                <span className="text-xl">🌿</span> {label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
