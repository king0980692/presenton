import React from 'react'
import * as z from 'zod'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from 'recharts'

export const layoutId = "tech-diversity"
export const layoutName = "08. Women in Tech"
export const layoutDescription = "Donut chart for gender."

export const Schema = z.object({
    title: z.string().default("Diversity in Tech"),

    data: z.array(z.object({
        name: z.string(),
        value: z.number(),
        color: z.string(),
    })).min(2).max(2).default([
        { name: "Women", value: 42, color: "#ec4899" },
        { name: "Men", value: 58, color: "#334155" },
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
                href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Inter:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0f172a] text-white p-20 flex"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <div className="w-1/2 flex flex-col justify-center">
                    <h2 className="text-5xl font-bold mb-10 font-mono" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {data?.title}
                    </h2>

                    <div className="text-6xl font-bold text-[#ec4899] mb-4">
                        {(data?.data?.[0]?.value)}%
                    </div>
                    <div className="text-xl text-gray-400 font-light">
                        Women in Leadership Roles
                    </div>
                </div>

                <div className="w-1/2 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data?.data || []}
                                cx="50%"
                                cy="50%"
                                innerRadius={120}
                                outerRadius={180}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {(data?.data || []).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: 'white' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
