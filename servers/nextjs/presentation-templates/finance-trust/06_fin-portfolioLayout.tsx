import React from 'react'
import * as z from 'zod'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from 'recharts'

export const layoutId = "fin-portfolio"
export const layoutName = "06. Portfolio Allocation"
export const layoutDescription = "Pie chart for asset mix."

export const Schema = z.object({
    title: z.string().default("Asset Allocation Strategy"),

    data: z.array(z.object({
        name: z.string(),
        value: z.number(),
        color: z.string(),
    })).min(4).max(4).default([
        { name: "Fixed Income", value: 40, color: "#1e3a8a" },
        { name: "Equities", value: 30, color: "#064e3b" },
        { name: "Real Estate", value: 20, color: "#d4af37" },
        { name: "Alternatives", value: 10, color: "#9ca3af" },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fafafa] px-20 py-16 flex items-center justify-between"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <div className="w-[45%]">
                    <h2 className="text-4xl font-serif text-[#1e3a8a] mb-12 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {data?.title}
                    </h2>

                    <div className="space-y-6">
                        {(data?.data || []).map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center border-b border-gray-300 pb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-lg font-serif">{item.name}</span>
                                </div>
                                <span className="font-bold text-xl">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-[50%] h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data?.data || []}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={160}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {(data?.data || []).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
