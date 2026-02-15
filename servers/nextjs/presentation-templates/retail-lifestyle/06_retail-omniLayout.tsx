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

export const layoutId = "retail-omni"
export const layoutName = "06. Omnichannel Sales"
export const layoutDescription = "Stacked bar for sales channels."

export const Schema = z.object({
    title: z.string().default("Sales by Channel"),

    data: z.array(z.object({
        year: z.string(),
        store: z.number(),
        online: z.number(),
    })).min(5).max(5).default([
        { year: "2020", store: 40, online: 60 },
        { year: "2021", store: 30, online: 70 },
        { year: "2022", store: 45, online: 55 },
        { year: "2023", store: 50, online: 50 },
        { year: "2024", store: 55, online: 45 },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16"
                style={{
                    fontFamily: "'Mulish', sans-serif",
                }}
            >
                <h2 className="text-4xl font-serif text-[#1c1917] mb-6 text-center" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    {data?.title}
                </h2>

                <div className="flex justify-center gap-8 mb-10 text-sm font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-[#c2410c] rounded-full"></div> In-Store
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-[#fcd34d] rounded-full"></div> Online
                    </div>
                </div>

                <div className="w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.data || []} barSize={60}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E5E4" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} dy={10} tick={{ fill: '#78716C', fontWeight: 'bold' }} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: '#FAFAF9' }} />
                            <Bar dataKey="store" stackId="a" fill="#c2410c" radius={[0, 0, 0, 0]} />
                            <Bar dataKey="online" stackId="a" fill="#fcd34d" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
