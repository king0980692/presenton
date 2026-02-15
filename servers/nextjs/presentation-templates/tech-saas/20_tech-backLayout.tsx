import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-back"
export const layoutName = "20. Back Cover"
export const layoutDescription = "Minimal dark footer."

export const Schema = z.object({
    company: z.string().default("NEURAL_CORE"),
    web: z.string().default("neuralcore.io"),
    email: z.string().default("hello@neuralcore.io"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0f172a] text-white flex flex-col justify-center items-center text-center p-20"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <div className="w-24 h-24 mb-12 relative animate-spin-slow">
                    <div className="absolute inset-0 border-4 border-[#38bdf8] rounded-full border-t-transparent"></div>
                    <div className="absolute inset-4 border-4 border-[#a855f7] rounded-full border-b-transparent"></div>
                </div>

                <h2 className="text-6xl font-bold font-mono tracking-tighter mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {data?.company}
                </h2>

                <p className="text-gray-400 text-lg mb-16 font-light">
                    Building the Future, Responsibly.
                </p>

                <div className="flex gap-8 text-xl font-mono text-[#38bdf8]">
                    <div>{data?.web}</div>
                    <div className="mx-2 text-gray-700">|</div>
                    <div>{data?.email}</div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
