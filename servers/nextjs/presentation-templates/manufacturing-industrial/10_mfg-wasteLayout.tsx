import React from 'react'
import * as z from 'zod'


export const layoutId = "mfg-waste"
export const layoutName = "10. Waste Diversion"
export const layoutDescription = "Donut chart for waste streams."

export const Schema = z.object({
    title: z.string().default("Zero Waste to Landfill"),

    description: z.string().default("Through aggressive recycling and waste-to-energy programs, we have minimized our landfill impact."),

    stats: z.array(z.object({
        label: z.string().default("Stream"),
        percent: z.number().default(0),
        color: z.string().default("#333"),
    })).min(3).max(3).default([
        { label: "Recycled", percent: 75, color: "#22C55E" },
        { label: "Energy Recovery", percent: 20, color: "#F59E0B" },
        { label: "Landfill", percent: 5, color: "#EF4444" },
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
                <div className="flex justify-between items-center mb-16">
                    <div className="w-1/2">
                        <h2 className="text-4xl font-bold uppercase mb-6 text-[#FFD700]" style={{ fontFamily: "'Oswald', sans-serif" }}>
                            {data?.title}
                        </h2>
                        <p className="text-xl text-gray-300 font-light leading-relaxed">
                            {data?.description}
                        </p>
                    </div>
                </div>

                {/* Visual Bar Representation instead of Pie for industrial look */}
                <div className="space-y-8">
                    {(data?.stats || []).map((stat, idx) => (
                        <div key={idx}>
                            <div className="flex justify-between mb-2 font-bold uppercase tracking-wider">
                                <span>{stat.label}</span>
                                <span style={{ color: stat.color }}>{stat.percent}%</span>
                            </div>
                            <div className="w-full h-12 bg-[#333] rounded-sm overflow-hidden border border-gray-700 relative">
                                {/* Striped Background */}
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)', backgroundSize: '10px 10px' }}></div>

                                <div
                                    className="h-full transition-all duration-1000 ease-out"
                                    style={{ width: `${stat.percent}%`, backgroundColor: stat.color }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex gap-4 text-xs text-gray-500 font-mono">
                    <div className="border border-gray-700 px-2 py-1">TARGET: 100% DIVERSION</div>
                    <div className="border border-gray-700 px-2 py-1">DEADLINE: 2025</div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
