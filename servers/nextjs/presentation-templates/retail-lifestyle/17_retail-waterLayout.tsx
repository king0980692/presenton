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

export const layoutId = "retail-water"
export const layoutName = "17. Water Savings"
export const layoutDescription = "Water drop chart."

export const Schema = z.object({
    title: z.string().default("Water Impact"),

    data: z.array(z.object({
        year: z.string(),
        saved: z.number(),
    })).min(5).max(5).default([
        { year: "2020", saved: 100 },
        { year: "2021", saved: 250 },
        { year: "2022", saved: 400 },
        { year: "2023", saved: 650 },
        { year: "2024", saved: 900 },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#eff6ff] p-16"
                style={{
                    fontFamily: "'Mulish', sans-serif",
                }}
            >
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-serif text-[#1e40af] mb-2" style={{ fontFamily: "'DM Serif Display', serif" }}>
                        {data?.title}
                    </h2>
                    <p className="text-[#3b82f6] font-bold">Liters Saved (Millions)</p>
                </div>

                <div className="w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.data || []}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DBEAFE" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} dy={10} tick={{ fill: '#60a5fa', fontWeight: 'bold' }} />
                            <YAxis axisLine={false} tickLine={false} hide />
                            <Tooltip cursor={{ fill: '#DBEAFE' }} />
                            {/* Shape as a simple bar for now, could be custom shape later */}
                            <Bar dataKey="saved" fill="#3b82f6" radius={[100, 100, 0, 0]} barSize={60} label={{ position: 'top', fill: '#1e40af', fontWeight: 'bold' }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Water wave decoration */}
                <div className="absolute bottom-0 left-0 w-full h-12 bg-[#bfdbfe] rounded-t-[50%] opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-full h-8 bg-[#60a5fa] rounded-t-[50%] opacity-50"></div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
