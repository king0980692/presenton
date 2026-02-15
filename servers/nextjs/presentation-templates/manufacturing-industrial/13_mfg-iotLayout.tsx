import React from 'react'
import * as z from 'zod'


export const layoutId = "mfg-iot"
export const layoutName = "13. Industry 4.0 Dashboard"
export const layoutDescription = "Tech grid for IoT stats."

export const Schema = z.object({
    title: z.string().default("Digital Transformation"),

    description: z.string().default("Integrating IoT sensors and AI analytics for maximum efficiency."),

    stats: z.array(z.object({
        val: z.string().default("0"),
        label: z.string().default("Metric"),
        icon: z.string().default("📡"),
    })).min(3).max(3).default([
        { val: "50,000+", label: "Sensors Deployed", icon: "📡" },
        { val: "99.9%", label: "Uptime Guaranteed", icon: "⚡" },
        { val: "15%", label: "Maintenance Cost Reduction", icon: "📉" },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0F172A] text-white"
                style={{
                    fontFamily: "'Roboto Condensed', sans-serif",
                }}
            >
                <div className="absolute inset-0 z-0">
                    {/* Cyber Grid Background */}
                    <div className="w-full h-full opacity-20" style={{ backgroundImage: 'linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                </div>

                <div className="relative z-10 px-24 py-16 flex flex-col h-full justify-center">
                    <h2 className="text-6xl font-bold uppercase mb-4 text-[#60A5FA] tracking-tighter" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        {data?.title}
                    </h2>
                    <p className="text-2xl text-gray-400 mb-16 max-w-2xl">{data?.description}</p>

                    <div className="flex gap-8">
                        {(data?.stats || []).map((stat, idx) => (
                            <div key={idx} className="bg-[#1E293B]/80 backdrop-blur border border-[#3B82F6] p-8 flex-1 rounded-sm shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                <div className="text-4xl mb-4">{stat.icon}</div>
                                <div className="text-5xl font-bold text-white mb-2 font-mono">{stat.val}</div>
                                <div className="text-[#60A5FA] font-bold uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
