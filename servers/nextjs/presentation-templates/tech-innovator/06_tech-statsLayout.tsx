import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-stats"
export const layoutName = "06. Tech Core Metrics"
export const layoutDescription = "Server monitoring style data blocks."

export const Schema = z.object({
    title: z.string().default("Mainframe_Analytics"),

    stats: z.array(z.object({
        val: z.string().default("99.9%"),
        label: z.string().default("Uptime"),
        trend: z.string().default("+0.4%"),
        color: z.enum(["cyan", "purple", "green"]).default("cyan"),
    })).min(4).max(4).default([
        { val: "40.5TB", label: "Data Processed", trend: "+12%", color: "cyan" },
        { val: "15ms", label: "Latency Avg", trend: "-5ms", color: "green" },
        { val: "2,400", label: "Threats Blocked", trend: "Normal", color: "purple" },
        { val: "100%", label: "Green Energy", trend: "Nominal", color: "green" },
    ]),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    const getColor = (c: string) => {
        if (c === 'green') return '#10B981';
        if (c === 'purple') return '#8B5CF6';
        return '#06B6D4'; // cyan
    }

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0F172A]"
                style={{
                    fontFamily: "'JetBrains Mono', monospace",
                }}
            >
                <div className="p-16 h-full flex flex-col">
                    <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-4">
                        <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                        {data?.title}
                    </h2>

                    <div className="grid grid-cols-2 gap-8 flex-1">
                        {(data?.stats || []).map((stat, idx) => {
                            const color = getColor(stat.color as string);
                            return (
                                <div key={idx} className="bg-[#1E293B] border border-gray-700 p-8 relative overflow-hidden group hover:border-gray-500">
                                    {/* Corner Accents */}
                                    <div className="absolute top-0 right-0 p-2 text-xs opacity-50 text-gray-400">ID_0{idx + 1}</div>

                                    <div className="text-sm text-gray-400 mb-2 uppercase tracking-wide">{stat.label}</div>

                                    <div className="flex items-baseline gap-4">
                                        <span className="text-6xl font-bold text-white">{stat.val}</span>
                                        <span className="text-sm px-2 py-1 rounded bg-black/30" style={{ color: color }}>
                                            {stat.trend}
                                        </span>
                                    </div>

                                    {/* Decorative Graph Line */}
                                    <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20">
                                        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                                            <path d={`M0,80 L20,${Math.random() * 60 + 20} L40,${Math.random() * 60 + 20} L60,${Math.random() * 60 + 20} L80,${Math.random() * 60 + 20} L100,50 V100 H0 Z`} fill={color} />
                                        </svg>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
