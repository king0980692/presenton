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

export const layoutId = "hosp-revpar"
export const layoutName = "15. Hospitality Growth"
export const layoutDescription = "Simple bar chart."

export const Schema = z.object({
    title: z.string().default("Sustainable Growth"),
    subtitle: z.string().default("Revenue Per Available Room (RevPAR)"),

    data: z.array(z.object({
        year: z.string(),
        value: z.number(),
    })).min(5).max(5).default([
        { year: "20", value: 80 },
        { year: "21", value: 95 },
        { year: "22", value: 120 },
        { year: "23", value: 145 },
        { year: "24", value: 160 },
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
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-20"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="text-center mb-12">
                    <h2 className="text-5xl text-[#1c1917] mb-4 font-serif italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {data?.title}
                    </h2>
                    <p className="text-gray-500 uppercase tracking-widest text-xs">{data?.subtitle}</p>
                </div>

                <div className="w-full h-[400px] max-w-3xl mx-auto">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.data || []}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#a8a29e' }} />
                            <YAxis axisLine={false} tickLine={false} hide />
                            <Tooltip cursor={{ fill: '#f5f5f4' }} />
                            <Bar dataKey="value" fill="#d6d3d1" activeBar={{ fill: '#b45309' }} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
