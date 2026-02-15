import React from 'react'
import * as z from 'zod'
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis
} from 'recharts'

export const layoutId = "tech-charts"
export const layoutName = "07. Tech Architecture Chart"
export const layoutDescription = "Radar chart for multi-dimensional analysis."

export const Schema = z.object({
    title: z.string().default("Performance_Matrix"),

    radar_data: z.array(z.object({
        subject: z.string(),
        A: z.number(),
        fullMark: z.number().default(150),
    })).min(5).max(6).default([
        { subject: 'Speed', A: 120, fullMark: 150 },
        { subject: 'Security', A: 98, fullMark: 150 },
        { subject: 'Uptime', A: 86, fullMark: 150 },
        { subject: 'Scale', A: 99, fullMark: 150 },
        { subject: 'Eco', A: 85, fullMark: 150 },
        { subject: 'UX', A: 65, fullMark: 150 },
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
                href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0B0F19] text-white flex p-10"
                style={{
                    fontFamily: "'JetBrains Mono', monospace",
                }}
            >
                {/* Left Info Panel */}
                <div className="w-1/3 flex flex-col justify-center pr-10 border-r border-gray-800">
                    <h2 className="text-4xl font-bold text-[#00E5FF] mb-6">{data?.title}</h2>

                    <div className="space-y-4 text-sm text-gray-400">
                        <p>Analysis of current ESG tech stack performance across key vectors.</p>
                        <div className="p-4 bg-[#1E293B] rounded border border-gray-700">
                            <div className="flex justify-between mb-1">
                                <span>Overall Score:</span>
                                <span className="text-[#00E5FF] font-bold">92/100</span>
                            </div>
                            <div className="w-full bg-black h-2 rounded-full overflow-hidden">
                                <div className="w-[92%] h-full bg-[#00E5FF]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Chart Area */}
                <div className="w-2/3 h-full relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Decorative circles */}
                        <div className="absolute w-[80%] h-[80%] border border-dashed border-gray-800 rounded-full animate-[spin_60s_linear_infinite]"></div>
                    </div>

                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data?.radar_data || []}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                            <Radar
                                name="Performance"
                                dataKey="A"
                                stroke="#00E5FF"
                                strokeWidth={2}
                                fill="#00E5FF"
                                fillOpacity={0.3}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '4px', backgroundColor: '#0F172A', border: '1px solid #334155', color: '#fff' }}
                                itemStyle={{ color: '#00E5FF' }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
