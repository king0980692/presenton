import React from 'react'
import * as z from 'zod'


export const layoutId = "corp-timeline"
export const layoutName = "09. Corporate Timeline"
export const layoutDescription = "Vertical timeline of milestones."

export const Schema = z.object({
    title: z.string().default("Our Journey"),

    milestones: z.array(z.object({
        year: z.string().default("Year"),
        event: z.string().default("Event description."),
    })).min(4).max(4).default([
        { year: "2010", event: "Company founded with a vision for global trade." },
        { year: "2015", event: "Expanded operations into Asian and European markets." },
        { year: "2020", event: "Launched comprehensive Sustainability 2030 strategy." },
        { year: "2024", event: "Achieved carbon neutrality in all domestic operations." },
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
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0A192F] text-white"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="p-20 h-full flex flex-col items-center">
                    <h2 className="text-4xl font-bold mb-16 text-[#C5A059]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {data?.title}
                    </h2>

                    <div className="w-full max-w-5xl relative">
                        {/* Center Line */}
                        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20 transform -translate-x-1/2"></div>

                        <div className="space-y-12">
                            {(data?.milestones || []).map((ms, idx) => (
                                <div key={idx} className={`flex items-center w-full ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                    {/* Text Side */}
                                    <div className={`w-[45%] ${idx % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                                        <div className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{ms.year}</div>
                                        <div className="text-gray-400 font-light">{ms.event}</div>
                                    </div>

                                    {/* Center Dot */}
                                    <div className="w-[10%] flex justify-center z-10">
                                        <div className="w-4 h-4 bg-[#C5A059] rotate-45 border-4 border-[#0A192F]"></div>
                                    </div>

                                    {/* Empty Side */}
                                    <div className="w-[45%]"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
