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

export const layoutId = "corp-charts"
export const layoutName = "07. Corporate Financials"
export const layoutDescription = "Financial bar chart and trend line."

export const Schema = z.object({
    title: z.string().default("Financial Performance"),

    chart_data: z.array(z.object({
        year: z.string(),
        revenue: z.number(),
        profit: z.number(),
    })).min(5).max(5).default([
        { year: "2020", revenue: 200, profit: 40 },
        { year: "2021", revenue: 250, profit: 60 },
        { year: "2022", revenue: 280, profit: 75 },
        { year: "2023", revenue: 320, profit: 90 },
        { year: "2024", revenue: 380, profit: 120 },
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
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#F8F9FA]"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="p-16 h-full flex flex-col">
                    <div className="flex justify-between items-end mb-10 border-b border-[#CBD5E1] pb-6">
                        <div>
                            <h2 className="text-4xl font-bold text-[#0A192F]" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {data?.title}
                            </h2>
                            <p className="text-[#64748B] mt-2">Revenue vs. Net Profit (in Millions USD)</p>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-[#0A192F]"></div>
                                <span className="text-sm font-bold text-[#475569]">Revenue</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-[#C5A059]"></div>
                                <span className="text-sm font-bold text-[#475569]">Profit</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 bg-white p-8 shadow-sm border border-[#E2E8F0]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data?.chart_data || []} barGap={0}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontWeight: 'bold', fontSize: 14 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8' }} />
                                <Tooltip
                                    cursor={{ fill: '#F1F5F9' }}
                                    contentStyle={{ border: 'none', borderRadius: '4px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Bar dataKey="revenue" fill="#0A192F" barSize={40} />
                                <Bar dataKey="profit" fill="#C5A059" barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
