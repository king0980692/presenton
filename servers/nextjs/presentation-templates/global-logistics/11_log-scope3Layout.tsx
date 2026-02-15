import React from 'react'
import * as z from 'zod'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from 'recharts'

export const layoutId = "log-scope3"
export const layoutName = "11. Scope 3 Breakdown"
export const layoutDescription = "Donut chart for value chain."

export const Schema = z.object({
    title: z.string().default("Value Chain Impact"),

    data: z.array(z.object({
        name: z.string(),
        value: z.number(),
        color: z.string(),
    })).min(4).max(4).default([
        { name: "Purchased Goods", value: 40, color: "#1e293b" },
        { name: "Sub-contracted Transport", value: 35, color: "#ea580c" },
        { name: "Fuel & Energy Activities", value: 15, color: "#94a3b8" },
        { name: "Waste & Other", value: 10, color: "#cbd5e1" },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-20 flex"
                style={{
                    fontFamily: "'Roboto Mono', monospace",
                }}
            >
                <div className="w-[40%] flex flex-col justify-center pr-12">
                    <h2 className="text-5xl font-black uppercase italic mb-8 text-[#0f172a]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {data?.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-8">
                        Scope 3 accounts for 75% of our total carbon footprint.
                    </p>

                    <div className="space-y-4">
                        {(data?.data || []).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <div className="w-4 h-4" style={{ backgroundColor: item.color }}></div>
                                <div className="font-bold text-sm text-[#0f172a]">{item.name}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-[60%]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data?.data || []}
                                cx="50%"
                                cy="50%"
                                innerRadius={100}
                                outerRadius={180}
                                paddingAngle={2}
                                dataKey="value"
                                stroke="none"
                            >
                                {(data?.data || []).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
