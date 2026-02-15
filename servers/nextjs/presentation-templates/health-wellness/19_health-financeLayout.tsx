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
} from 'recharts'

export const layoutId = "health-finance"
export const layoutName = "19. R&D Investment"
export const layoutDescription = "Simple bar chart."

export const Schema = z.object({
    title: z.string().default("Reinvesting in Innovation"),

    data: z.array(z.object({
        year: z.string(),
        investment: z.number(),
    })).min(5).max(5).default([
        { year: "2019", investment: 15 },
        { year: "2020", investment: 18 },
        { year: "2021", investment: 22 },
        { year: "2022", investment: 20 },
        { year: "2023", investment: 25 },
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
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {data?.title}
                    </h2>
                    <p className="text-gray-500">R&D Spend (% of Revenue)</p>
                </div>

                <div className="w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.data || []}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} dy={10} />
                            <YAxis axisLine={false} tickLine={false} domain={[0, 30]} />
                            <Tooltip cursor={{ fill: '#F0FDFA' }} />
                            <Bar dataKey="investment" fill="#0D9488" radius={[8, 8, 0, 0]} barSize={60} label={{ position: 'top', fill: '#0D9488', fontWeight: 'bold' }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
