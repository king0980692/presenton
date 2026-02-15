import React from 'react'
import * as z from 'zod'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from 'recharts'

export const layoutId = "retail-sales"
export const layoutName = "18. Sales Mix"
export const layoutDescription = "Donut chart for categories."

export const Schema = z.object({
    title: z.string().default("What You Loved"),

    data: z.array(z.object({
        name: z.string(),
        value: z.number(),
        color: z.string(),
    })).min(4).max(4).default([
        { name: "Apparel", value: 45, color: "#c2410c" },
        { name: "Accessories", value: 25, color: "#fb923c" },
        { name: "Home", value: 20, color: "#fcd34d" },
        { name: "Beauty", value: 10, color: "#a8a29e" },
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
                href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Mulish:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16 flex items-center justify-between"
                style={{
                    fontFamily: "'Mulish', sans-serif",
                }}
            >
                <div className="w-1/2 pr-12">
                    <h2 className="text-5xl font-serif text-[#1c1917] mb-12" style={{ fontFamily: "'DM Serif Display', serif" }}>
                        {data?.title}
                    </h2>

                    <div className="grid grid-cols-1 gap-6">
                        {(data?.data || []).map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                                <div className="flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="font-bold text-lg text-gray-700">{item.name}</span>
                                </div>
                                <span className="font-black text-xl text-gray-800">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-1/2 h-[500px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data?.data || []}
                                cx="50%"
                                cy="50%"
                                innerRadius={100}
                                outerRadius={180}
                                paddingAngle={5}
                                dataKey="value"
                                cornerRadius={10}
                            >
                                {(data?.data || []).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
