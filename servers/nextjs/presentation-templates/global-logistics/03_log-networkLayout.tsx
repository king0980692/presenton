import React from 'react'
import * as z from 'zod'


export const layoutId = "log-network"
export const layoutName = "03. Global Network"
export const layoutDescription = "World map with routes."

export const Schema = z.object({
    title: z.string().default("Connected World"),

    hubs: z.string().default("150+ Distribution Hubs"),
    routes: z.string().default("2,000+ Daily Routes"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0f172a] text-white"
                style={{
                    fontFamily: "'Roboto Mono', monospace",
                }}
            >
                <div className="absolute inset-0 opacity-40">
                    {/* Simplified svg map - placeholder url used */}
                    <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center invert filter sepia-[.5] hue-rotate-[180deg]"></div>
                </div>

                {/* Route Lines Animation (Simulated) */}
                <div className="absolute inset-0">
                    <svg className="w-full h-full">
                        <path d="M200,300 Q400,100 800,200" stroke="#ea580c" strokeWidth="2" fill="none" strokeDasharray="5,5" className="animate-pulse" />
                        <path d="M800,200 Q900,400 1100,500" stroke="#38bdf8" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                        <path d="M200,300 Q500,500 1000,400" stroke="#ea580c" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                    </svg>
                </div>

                <div className="relative z-10 w-full h-full flex flex-col justify-between p-16 pointer-events-none">
                    <div>
                        <h2 className="text-6xl font-black uppercase italic tracking-tighter" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                            {data?.title}
                        </h2>
                    </div>

                    <div className="flex gap-12 bg-[#1e293b]/90 backdrop-blur p-8 rounded-tr-3xl w-fit border-l-4 border-[#ea580c]">
                        <div>
                            <div className="text-4xl font-bold text-[#ea580c]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{data?.hubs}</div>
                        </div>
                        <div className="w-[1px] bg-gray-600"></div>
                        <div>
                            <div className="text-4xl font-bold text-[#38bdf8]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{data?.routes}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
