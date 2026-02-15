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
} from 'recharts'

export const layoutId = "re-finance"
export const layoutName = "16. Financial Stability"
export const layoutDescription = "Stacked bar for revenue."

export const Schema = z.object({
    title: z.string().default("Asset Growth"),

    data: z.array(z.object({
        year: z.string(),
        revenue: z.number(),
    })).min(5).max(5).default([
        { year: "20", revenue: 200 },
        { year: "21", revenue: 240 },
        { year: "22", revenue: 280 },
        { year: "23", revenue: 350 },
        { year: "24", revenue: 420 },
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
                href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;500;700&family=Roboto:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-20"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-8">
                    <h2 className="text-4xl font-bold uppercase text-[#374151]" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        {data?.title}
                    </h2>
                    <div className="text-right">
                        <div className="text-gray-400 text-sm uppercase tracking-widest">Revenue (Millions USD)</div>
                    </div>
                </div>

                <div className="w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.data || []}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontWeight: 'bold' }} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: '#f9fafb' }} />
                            <Bar dataKey="revenue" fill="#374151" barSize={60} label={{ position: 'top', fill: '#374151', fontWeight: 'bold' }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
