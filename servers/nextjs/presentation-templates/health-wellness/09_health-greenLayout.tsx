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

export const layoutId = "health-green"
export const layoutName = "09. Green Hospital Stats"
export const layoutDescription = "Bar chart for energy savings."

export const Schema = z.object({
    title: z.string().default("Sustainable Operations"),

    data: z.array(z.object({
        category: z.string(),
        value: z.number(),
    })).min(3).max(3).default([
        { category: "Energy Saved", value: 25 },
        { category: "Water Saved", value: 40 },
        { category: "CO2 Reduced", value: 30 },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#F0FDF4] p-16"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="flex items-center gap-6 mb-12">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl">🌿</div>
                    <h2 className="text-4xl font-bold text-green-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {data?.title}
                    </h2>
                </div>

                <div className="grid grid-cols-3 gap-12 h-[400px]">
                    {(data?.data || []).map((item, idx) => (
                        <div key={idx} className="flex flex-col justify-end bg-white rounded-2xl shadow-sm overflow-hidden relative group">
                            <div className="absolute inset-x-0 bottom-0 bg-green-100 transition-all duration-1000 group-hover:bg-green-200" style={{ height: `${item.value * 2}%` }}></div>

                            <div className="relative z-10 p-8 text-center">
                                <div className="text-6xl font-bold text-green-600 mb-4">{item.value}%</div>
                                <div className="font-bold text-green-900 uppercase tracking-widest">{item.category}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
