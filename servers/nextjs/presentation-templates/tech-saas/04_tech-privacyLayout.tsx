import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-privacy"
export const layoutName = "04. Data Privacy"
export const layoutDescription = "Shield and lock visualization."

export const Schema = z.object({
    title: z.string().default("Privacy by Design"),

    stat_1: z.string().default("100%"),
    desc_1: z.string().default("Encrypted at Rest"),

    stat_2: z.string().default("0"),
    desc_2: z.string().default("Data Breaches in 2023"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#020617] text-white flex"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <div className="w-1/2 flex items-center justify-center relative">
                    <div className="w-80 h-80 rounded-full bg-[#38bdf8]/10 animate-pulse absolute"></div>
                    <div className="text-[150px]">🔒</div>
                </div>

                <div className="w-1/2 p-20 flex flex-col justify-center">
                    <h2 className="text-5xl font-bold mb-12 font-mono" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {data?.title}
                    </h2>

                    <div className="flex flex-col gap-10">
                        <div className="border-l-4 border-[#38bdf8] pl-6">
                            <div className="text-6xl font-bold text-[#38bdf8] mb-1">{data?.stat_1}</div>
                            <div className="text-gray-400 uppercase tracking-widest">{data?.desc_1}</div>
                        </div>

                        <div className="border-l-4 border-[#a855f7] pl-6">
                            <div className="text-6xl font-bold text-[#a855f7] mb-1">{data?.stat_2}</div>
                            <div className="text-gray-400 uppercase tracking-widest">{data?.desc_2}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
