import React from 'react'
import * as z from 'zod'


export const layoutId = "agri-regen"
export const layoutName = "04. Regenerative Ag"
export const layoutDescription = "Icon cycle."

export const Schema = z.object({
    title: z.string().default("Regenerative Cycle"),

    steps: z.array(z.string()).min(4).max(4).default([
        "Cover Cropping",
        "No-Till Farming",
        "Livestock Integration",
        "Biodiversity",
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#ffedd5] p-20 flex flex-col items-center justify-center p-20"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <h2 className="text-5xl font-bold mb-20 text-[#7c2d12]" style={{ fontFamily: "'Merriweather', serif" }}>
                    {data?.title}
                </h2>

                <div className="grid grid-cols-2 gap-12 max-w-4xl relative">
                    {/* Center connector */}
                    <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-[#fff7ed] rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center border-4 border-[#ea580c] shadow-lg z-10">
                        <div className="text-center font-bold text-[#ea580c] text-sm uppercase">Soil Health</div>
                    </div>

                    {(data?.steps || []).map((step, idx) => (
                        <div key={idx} className={`flex items-center gap-6 bg-white p-8 rounded-xl shadow-md border-b-4 border-[#16a34a] ${idx % 2 === 0 ? 'justify-end' : ''}`}>
                            <div className="w-12 h-12 rounded-full bg-[#16a34a] flex items-center justify-center text-white font-bold">{idx + 1}</div>
                            <div className="text-xl font-bold text-[#14532d]">{step}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
