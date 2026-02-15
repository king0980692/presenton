import React from 'react'
import * as z from 'zod'


export const layoutId = "mfg-roadmap"
export const layoutName = "19. Strategic Roadmap 2030"
export const layoutDescription = "Timeline for future goals."

export const Schema = z.object({
    title: z.string().default("Vision 2030 Roadmap"),

    milestones: z.array(z.object({
        year: z.string().default("Year"),
        goal: z.string().default("Goal"),
    })).min(5).max(5).default([
        { year: "2024", goal: "Launch Smart Factory Pilot" },
        { year: "2025", goal: "Achieve 50% Renewable Energy" },
        { year: "2026", goal: "Zero Waste Certification Global" },
        { year: "2028", goal: "Net Zero Operations (Scope 1+2)" },
        { year: "2030", goal: "Fully Circular Product Line" },
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
                href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto+Condensed:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#1A1A1A] text-white p-16"
                style={{
                    fontFamily: "'Roboto Condensed', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold uppercase mb-16 text-[#FFD700]" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="relative">
                    {/* Horizontal Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-600 -translate-y-1/2"></div>

                    <div className="flex justify-between relative z-10">
                        {(data?.milestones || []).map((ms, idx) => (
                            <div key={idx} className="flex flex-col items-center w-48 text-center group">
                                <div className="w-6 h-6 bg-[#1A1A1A] border-4 border-[#FFD700] rounded-full mb-8 group-hover:scale-125 transition-transform"></div>

                                <div className="text-4xl font-bold text-gray-400 group-hover:text-white transition-colors mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>
                                    {ms.year}
                                </div>

                                <div className="text-sm border-t border-[#FFD700] pt-2 max-w-[120px]">
                                    {ms.goal}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
