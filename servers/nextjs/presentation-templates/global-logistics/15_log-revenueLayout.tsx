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

export const layoutId = "log-revenue"
export const layoutName = "15. Regional Revenue"
export const layoutDescription = "Stacked bar chart."

export const Schema = z.object({
    title: z.string().default("Global Growth"),

    data: z.array(z.object({
        region: z.string(),
        revenue: z.number(),
    })).min(5).max(5).default([
        { region: "North America", revenue: 450 },
        { region: "Europe", revenue: 380 },
        { region: "Asia Pacific", revenue: 520 },
        { region: "LatAm", revenue: 150 },
        { region: "MEA", revenue: 100 },
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
                href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Roboto+Mono:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#f8fafc] p-20"
                style={{
                    fontFamily: "'Roboto Mono', monospace",
                }}
            >
                <h2 className="text-5xl font-black uppercase italic mb-12 text-[#0f172a]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {data?.title} <span className="text-lg normal-case not-italic font-normal text-gray-500">(USD Millions)</span>
                </h2>

                <div className="w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.data || []} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <YAxis dataKey="region" type="category" width={150} axisLine={false} tickLine={false} tick={{ fill: '#0f172a', fontWeight: 'bold' }} />
                            <Tooltip cursor={{ fill: '#f1f5f9' }} />
                            <Bar dataKey="revenue" fill="#0f172a" barSize={30} radius={[0, 4, 4, 0]} label={{ position: 'right', fill: '#0f172a', fontWeight: 'bold' }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
