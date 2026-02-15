import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-rnd"
export const layoutName = "15. R&D Investment"
export const layoutDescription = "Progress bar style."

export const Schema = z.object({
    title: z.string().default("Innovation Engine"),

    percent: z.string().default("40%"),
    label: z.string().default("of Revenue Reinvested in R&D"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0f172a] text-white p-20 flex flex-col justify-center"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <h2 className="text-5xl font-bold font-mono mb-20 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="w-full max-w-4xl mx-auto">
                    {/* Outline Bar */}
                    <div className="w-full h-32 border-4 border-gray-700 rounded-2xl p-2 relative overflow-hidden">
                        {/* Fill Bar */}
                        <div className="h-full bg-gradient-to-r from-[#a855f7] to-[#ec4899] rounded-xl flex items-center justify-end pr-8 w-[40%] animate-pulse shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                            <span className="text-5xl font-bold text-white">{data?.percent}</span>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-2xl text-gray-400 font-light font-mono">
                        {data?.label}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
