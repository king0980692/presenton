import React from 'react'
import * as z from 'zod'
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts'

export const layoutId = "tech-arr"
export const layoutName = "14. ARR Growth"
export const layoutDescription = "Area chart for revenue."

export const Schema = z.object({
    title: z.string().default("Sustainable Growth"),

    data: z.array(z.object({
        year: z.string(),
        arr: z.number(),
    })).min(5).max(5).default([
        { year: "20", arr: 10 },
        { year: "21", arr: 25 },
        { year: "22", arr: 45 },
        { year: "23", arr: 80 },
        { year: "24", arr: 120 },
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
                href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Inter:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#020617] text-white p-20"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <div className="absolute top-10 right-10 text-[#38bdf8] font-bold text-6xl opacity-20">$120M</div>

                <h2 className="text-4xl font-bold font-mono mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {data?.title} <span className="text-gray-500 text-base ml-4">(ARR in Millions)</span>
                </h2>

                <div className="w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data?.data || []}>
                            <defs>
                                <linearGradient id="colorArr" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <YAxis axisLine={false} tickLine={false} hide />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
                            <Area type="monotone" dataKey="arr" stroke="#38bdf8" strokeWidth={4} fillOpacity={1} fill="url(#colorArr)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
