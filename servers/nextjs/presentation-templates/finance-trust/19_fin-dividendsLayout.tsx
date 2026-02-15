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

export const layoutId = "fin-dividends"
export const layoutName = "19. Dividend History"
export const layoutDescription = "Bar chart for shareholder returns."

export const Schema = z.object({
    title: z.string().default("Shareholder Returns"),

    data: z.array(z.object({
        year: z.string(),
        dividend: z.number(),
    })).min(5).max(5).default([
        { year: "2019", dividend: 1.20 },
        { year: "2020", dividend: 1.25 },
        { year: "2021", dividend: 1.35 },
        { year: "2022", dividend: 1.45 },
        { year: "2023", dividend: 1.60 },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white px-20 py-16"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-serif text-[#064e3b] italic mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {data?.title}
                    </h2>
                    <p className="text-gray-500">Dividend per Share (USD)</p>
                </div>

                <div className="w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.data || []}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} dy={10} tick={{ fill: '#64748B' }} />
                            <YAxis axisLine={false} tickLine={false} domain={[0, 2]} />
                            <Tooltip cursor={{ fill: '#F8FAFC' }} />
                            <Bar dataKey="dividend" fill="#d4af37" barSize={50} label={{ position: 'top', fill: '#064e3b', fontWeight: 'bold' }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
