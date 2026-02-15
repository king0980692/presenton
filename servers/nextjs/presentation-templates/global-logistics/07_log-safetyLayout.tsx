import React from 'react'
import * as z from 'zod'


export const layoutId = "log-safety"
export const layoutName = "07. Driver Safety"
export const layoutDescription = "Dashboard gauges."

export const Schema = z.object({
    title: z.string().default("Safety Dashboard"),

    training: z.string().default("98%"),
    incidents: z.string().default("0"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0f172a] text-white p-20"
                style={{
                    fontFamily: "'Roboto Mono', monospace",
                }}
            >
                <div className="flex justify-between items-center mb-16 border-b border-gray-700 pb-8">
                    <h2 className="text-5xl font-black uppercase italic" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {data?.title}
                    </h2>
                    <div className="flex items-center gap-2 text-[#22c55e]">
                        <div className="w-3 h-3 bg-[#22c55e] rounded-full animate-pulse"></div>
                        SYSTEM NORMAL
                    </div>
                </div>

                <div className="flex gap-20 justify-center">
                    {/* Gauge 1 */}
                    <div className="relative w-64 h-64">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="128" cy="128" r="100" stroke="#1e293b" strokeWidth="20" fill="none" />
                            <circle cx="128" cy="128" r="100" stroke="#38bdf8" strokeWidth="20" fill="none" strokeDasharray="628" strokeDashoffset="20" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-5xl font-bold">{data?.training}</div>
                            <div className="text-xs text-gray-400 mt-2 uppercase">Training Completion</div>
                        </div>
                    </div>

                    {/* Gauge 2 */}
                    <div className="relative w-64 h-64">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="128" cy="128" r="100" stroke="#1e293b" strokeWidth="20" fill="none" />
                            <circle cx="128" cy="128" r="100" stroke="#ea580c" strokeWidth="20" fill="none" strokeDasharray="628" strokeDashoffset="628" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-5xl font-bold">{data?.incidents}</div>
                            <div className="text-xs text-gray-400 mt-2 uppercase">Fatalaties</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
