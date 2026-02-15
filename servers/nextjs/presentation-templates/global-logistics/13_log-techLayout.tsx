import React from 'react'
import * as z from 'zod'


export const layoutId = "log-tech"
export const layoutName = "13. AI Logistics"
export const layoutDescription = "Network nodes style."

export const Schema = z.object({
    title: z.string().default("Smart Routing"),

    efficiency: z.string().default("+20%"),
    desc: z.string().default("Fuel Efficiency via AI Optimization"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Roboto+Mono:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0f172a] text-white flex items-center justify-center p-20"
                style={{
                    fontFamily: "'Roboto Mono', monospace",
                }}
            >
                {/* Animated grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                <div className="z-10 text-center bg-[#0f172a]/90 backdrop-blur border border-[#38bdf8] p-20 rounded-xl shadow-[0_0_50px_rgba(56,189,248,0.2)]">
                    <div className="text-[#38bdf8] text-6xl mb-8 animate-pulse">
                        🧠 ⇄ 🚚
                    </div>

                    <h2 className="text-6xl font-black uppercase italic mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {data?.title}
                    </h2>

                    <div className="text-8xl font-bold text-[#ea580c] mb-4">{data?.efficiency}</div>
                    <div className="text-gray-400 uppercase tracking-widest">{data?.desc}</div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
