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

export const layoutId = "fin-green"
export const layoutName = "05. Green Financing"
export const layoutDescription = "Bar chart for sustainable assets."

export const Schema = z.object({
    title: z.string().default("Sustainable Finance Growth"),

    data: z.array(z.object({
        year: z.string(),
        value: z.number(),
    })).min(5).max(5).default([
        { year: "2020", value: 5.2 },
        { year: "2021", value: 8.5 },
        { year: "2022", value: 12.1 },
        { year: "2023", value: 18.4 },
        { year: "2024", value: 25.0 },
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
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-4xl font-serif text-[#064e3b] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {data?.title}
                        </h2>
                        <p className="text-gray-500">Cumulative Portfolio Volume (Billions USD)</p>
                    </div>

                    <div className="text-right">
                        <div className="text-5xl font-serif font-bold text-[#d4af37]">$25.0B</div>
                        <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Total Committed</div>
                    </div>
                </div>

                <div className="w-full h-[400px] border-l border-b border-gray-200">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.data || []}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} dy={10} tick={{ fill: '#6B7280' }} />
                            <YAxis axisLine={false} tickLine={false} hide />
                            <Tooltip cursor={{ fill: '#F0FDF4' }} itemStyle={{ color: '#064e3b' }} />
                            <Bar dataKey="value" fill="#064e3b" barSize={80} label={{ position: 'top', fill: '#064e3b', fontWeight: 'bold' }}>
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
