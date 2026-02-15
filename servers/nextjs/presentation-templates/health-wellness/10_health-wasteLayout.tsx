import React from 'react'
import * as z from 'zod'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from 'recharts'

export const layoutId = "health-waste"
export const layoutName = "10. Medical Waste Management"
export const layoutDescription = "Donut chart for waste types."

export const Schema = z.object({
    title: z.string().default("Medical Waste Disposal"),

    data: z.array(z.object({
        name: z.string(),
        value: z.number(),
        color: z.string(),
    })).min(3).max(3).default([
        { name: "Incineration", value: 30, color: "#EF4444" },
        { name: "Sterilization", value: 50, color: "#3B82F6" },
        { name: "Recycling", value: 20, color: "#10B981" },
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
                href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Montserrat:wght@400;600;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white px-20 py-16"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold text-gray-800 text-center mb-10" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="flex items-center justify-center gap-16">
                    <div className="w-[400px] h-[400px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data?.data || []}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={100}
                                    outerRadius={140}
                                    paddingAngle={5}
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={-270}
                                >
                                    {(data?.data || []).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <span className="text-gray-400 text-xs uppercase font-bold">Total Volume</span>
                            <div className="text-4xl font-bold text-gray-800">500T</div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        {(data?.data || []).map((entry, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                <div className="text-xl font-bold text-gray-700">{entry.name}</div>
                                <div className="text-xl font-bold text-gray-400">{entry.value}%</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
