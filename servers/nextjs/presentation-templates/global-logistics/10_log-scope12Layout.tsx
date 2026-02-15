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
    Legend,
} from 'recharts'

export const layoutId = "log-scope12"
export const layoutName = "10. Scope 1 & 2"
export const layoutDescription = "Grouped bar chart."

export const Schema = z.object({
    title: z.string().default("Operational Emissions"),

    data: z.array(z.object({
        year: z.string(),
        scope1: z.number(),
        scope2: z.number(),
    })).min(3).max(3).default([
        { year: "2022", scope1: 50, scope2: 20 },
        { year: "2023", scope1: 45, scope2: 15 },
        { year: "2024", scope1: 35, scope2: 10 },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-20"
                style={{
                    fontFamily: "'Roboto Mono', monospace",
                }}
            >
                <h2 className="text-5xl font-black uppercase italic mb-8 text-[#0f172a]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {data?.title}
                </h2>
                <p className="text-gray-500 mb-12">Reducing direct fleet emissions (Scope 1) and facility energy use (Scope 2).</p>

                <div className="w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.data || []}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontWeight: 'bold' }} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: '#f1f5f9' }} />
                            <Legend iconType="square" />
                            <Bar dataKey="scope1" fill="#0f172a" name="Scope 1 (Fleet)" />
                            <Bar dataKey="scope2" fill="#38bdf8" name="Scope 2 (Electricity)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
