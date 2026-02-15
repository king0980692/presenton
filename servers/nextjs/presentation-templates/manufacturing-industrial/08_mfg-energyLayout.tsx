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

export const layoutId = "mfg-energy"
export const layoutName = "08. Energy Efficiency"
export const layoutDescription = "Area chart for energy consumption."

export const Schema = z.object({
    title: z.string().default("Energy Intensity Reduction"),

    data: z.array(z.object({
        year: z.string(),
        use: z.number(),
    })).min(5).max(5).default([
        { year: "2019", use: 1000 },
        { year: "2020", use: 950 },
        { year: "2021", use: 880 },
        { year: "2022", use: 820 },
        { year: "2023", use: 750 },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white text-[#1A1A1A] p-16"
                style={{
                    fontFamily: "'Roboto Condensed', sans-serif",
                }}
            >
                <div className="flex justify-between items-end mb-10">
                    <h2 className="text-4xl font-bold uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        {data?.title}
                    </h2>
                    <div className="text-3xl font-bold text-[#FFD700] bg-[#1A1A1A] px-4 py-2">
                        -25% <span className="text-sm font-normal text-gray-400">Since 2019</span>
                    </div>
                </div>

                <div className="w-full h-[450px] bg-[#F4F4F4] border border-gray-300 p-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data?.data || []}>
                            <defs>
                                <linearGradient id="colorUse" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontWeight: 'bold', fill: '#1A1A1A' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', color: '#fff', border: 'none' }} itemStyle={{ color: '#FFD700' }} />
                            <Area type="monotone" dataKey="use" stroke="#FFD700" fillOpacity={1} fill="url(#colorUse)" strokeWidth={3} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
