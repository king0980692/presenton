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
    AreaChart,
    Area,
} from 'recharts'

export const layoutId = "minimal-charts"
export const layoutName = "5. Data Visualization"
export const layoutDescription = "Rich data visualization with multiple charts."

export const Schema = z.object({
    page_title: z.string().min(5).max(70).default("Sustainability Performance").meta({
        description: "Main heading text.",
    }),

    // Chart 1: Bar Chart (e.g., Emissions)
    chart_1_title: z.string().default("CO2 Emissions Reduction (Tons)").meta({ description: "Title for left chart" }),
    chart_1_data: z.array(z.object({
        name: z.string().default("2020"),
        value: z.number().default(100),
    })).min(3).max(6).default([
        { name: "2020", value: 5000 },
        { name: "2021", value: 4200 },
        { name: "2022", value: 3500 },
        { name: "2023", value: 2800 },
    ]).meta({ description: "Data for bar chart" }),

    // Chart 2: Area Chart (e.g., Renewable Energy)
    chart_2_title: z.string().default("Renewable Energy Usage (%)").meta({ description: "Title for right chart" }),
    chart_2_data: z.array(z.object({
        name: z.string().default("Q1"),
        value: z.number().default(20),
    })).min(3).max(6).default([
        { name: "Q1", value: 20 },
        { name: "Q2", value: 35 },
        { name: "Q3", value: 50 },
        { name: "Q4", value: 65 },
    ]).meta({ description: "Data for area chart" }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col"
                style={{
                    fontFamily: "var(--heading-font-family, Inter)",
                    backgroundColor: 'var(--card-background-color, #FFFFFF)',
                }}
            >
                {/* Header */}
                <div className="w-full p-10 pb-0">
                    <h2 className="text-3xl font-bold" style={{ color: 'var(--text-heading-color, #111827)' }}>
                        {data?.page_title || "Sustainability Performance"}
                    </h2>
                    <div className="w-20 h-1 bg-black mt-4"></div>
                </div>

                {/* Charts Container */}
                <div className="flex-1 grid grid-cols-2 gap-10 p-10">

                    {/* Chart 1 */}
                    <div className="flex flex-col bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-6 text-gray-700">{data?.chart_1_title}</h3>
                        <div className="flex-1 w-full min-h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data?.chart_1_data || []}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                    <Tooltip
                                        cursor={{ fill: '#F3F4F6' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="value" fill="#111827" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Chart 2 */}
                    <div className="flex flex-col bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-6 text-gray-700">{data?.chart_2_title}</h3>
                        <div className="flex-1 w-full min-h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data?.chart_2_data || []}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#111827" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#111827" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#111827" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
