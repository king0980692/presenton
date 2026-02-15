import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-green"
export const layoutName = "05. Green Data Centers"
export const layoutDescription = "Server rack visualization."

export const Schema = z.object({
    title: z.string().default("Digital Carbon Footprint"),

    usage: z.string().default("100% Renewable Energy"),
    pue: z.string().default("1.10 PUE (Power Usage Effectiveness)"),

    img: z.string().url().default("https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Inter:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-black text-white"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <img src={data?.img} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                <div className="relative z-10 w-full h-full p-20 flex flex-col justify-end">
                    <h2 className="text-6xl font-bold mb-8 font-mono" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {data?.title}
                    </h2>

                    <div className="flex gap-12">
                        <div className="bg-[#22c55e]/20 border border-[#22c55e] p-6 rounded backdrop-blur-sm">
                            <div className="text-[#22c55e] text-3xl font-bold mb-2">⚡ {data?.usage}</div>
                        </div>

                        <div className="bg-[#38bdf8]/20 border border-[#38bdf8] p-6 rounded backdrop-blur-sm">
                            <div className="text-[#38bdf8] text-3xl font-bold mb-2">📉 {data?.pue}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
