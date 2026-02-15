import React from 'react'
import * as z from 'zod'


export const layoutId = "log-roadmap"
export const layoutName = "19. 2050 Roadmap"
export const layoutDescription = "Arrow timeline."

export const Schema = z.object({
    title: z.string().default("Course to Net Zero"),

    milestones: z.array(z.string()).min(3).max(3).default([
        "2030: 40% Emissions Cut",
        "2040: Carbon Neutral Operations",
        "2050: Net Zero Value Chain",
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
                href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Roboto+Mono:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-20 flex flex-col"
                style={{
                    fontFamily: "'Roboto Mono', monospace",
                }}
            >
                <h2 className="text-5xl font-black uppercase italic mb-20 text-center text-[#0f172a]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="flex justify-between items-center relative">
                    {/* Arrow graphic background */}
                    <div className="absolute top-1/2 left-0 w-full h-20 bg-gray-100 -z-10 transform -translate-y-1/2 skew-x-[-20deg]"></div>

                    {(data?.milestones || []).map((ms, idx) => (
                        <div key={idx} className="bg-[#0f172a] text-white p-8 w-80 transform skew-x-[-12deg] hover:bg-[#ea580c] transition-colors group cursor-default">
                            <div className="transform skew-x-[12deg]">
                                <div className="text-4xl font-black italic mb-2">{ms.split(':')[0]}</div>
                                <div className="text-sm font-bold uppercase text-gray-400 group-hover:text-white">{ms.split(':')[1]}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
