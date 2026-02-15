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

export const layoutId = "re-water"
export const layoutName = "11. Water Systems"
export const layoutDescription = "Water drop chart."

export const Schema = z.object({
    title: z.string().default("Every Drop Counts"),

    data: z.array(z.object({
        year: z.string(),
        rainwater: z.number(),
        recycled: z.number(),
    })).min(5).max(5).default([
        { year: "2020", rainwater: 10, recycled: 5 },
        { year: "2021", rainwater: 20, recycled: 10 },
        { year: "2022", rainwater: 35, recycled: 15 },
        { year: "2023", rainwater: 50, recycled: 25 },
        { year: "2024", rainwater: 80, recycled: 40 },
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
                href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;500;700&family=Roboto:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-20"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h2 className="text-5xl font-bold uppercase text-[#1e3a8a]" style={{ fontFamily: "'Oswald', sans-serif" }}>
                            {data?.title}
                        </h2>
                        <div className="text-gray-500">Water Recycling Capacity (m³)</div>
                    </div>

                    <div className="flex gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-[#3b82f6]"></div> Rainwater
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-[#93c5fd]"></div> Greywater Recycled
                        </div>
                    </div>
                </div>

                <div className="w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.data || []}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontWeight: 'bold' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: '#f3f4f6' }} />
                            <Bar dataKey="rainwater" stackId="a" fill="#3b82f6" />
                            <Bar dataKey="recycled" stackId="a" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Decorative Pipe */}
                <div className="absolute bottom-0 right-0 w-32 h-32 border-r-8 border-b-8 border-[#1e3a8a] rounded-br-[40px] opacity-10"></div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
