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

export const layoutId = "tech-scope3"
export const layoutName = "11. Scope 3 Emissions"
export const layoutDescription = "Bar chart for hardware."

export const Schema = z.object({
    title: z.string().default("Hardware Lifecycle Emissions"),

    data: z.array(z.object({
        source: z.string(),
        value: z.number(),
    })).min(4).max(4).default([
        { source: "Manufacturing", value: 65 },
        { source: "Usage", value: 20 },
        { source: "Transport", value: 10 },
        { source: "End-of-Life", value: 5 },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#020617] text-white p-20"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-5xl font-bold font-mono mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {data?.title}
                        </h2>
                        <p className="text-gray-400">Emissions Breakdown by Phase (%)</p>
                    </div>
                </div>

                <div className="w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.data || []} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#1e293b" />
                            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <YAxis dataKey="source" type="category" width={150} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 14, fontFamily: 'monospace' }} />
                            <Tooltip cursor={{ fill: '#0f172a' }} contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff' }} />
                            <Bar dataKey="value" fill="#38bdf8" barSize={40} radius={[0, 4, 4, 0]} label={{ position: 'right', fill: '#38bdf8', fontWeight: 'bold' }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
