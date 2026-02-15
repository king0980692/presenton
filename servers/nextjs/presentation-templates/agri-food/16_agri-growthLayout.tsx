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

export const layoutId = "agri-growth"
export const layoutName = "16. Growth Harvest"
export const layoutDescription = "Bar chart crops."

export const Schema = z.object({
    title: z.string().default("Growing Revenue"),

    data: z.array(z.object({
        year: z.string(),
        value: z.number(),
    })).min(5).max(5).default([
        { year: "20", value: 40 },
        { year: "21", value: 45 },
        { year: "22", value: 55 },
        { year: "23", value: 70 },
        { year: "24", value: 90 },
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
                href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,700;1,300&family=Open+Sans:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-20 flex flex-col"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <h2 className="text-5xl font-bold mb-12 text-[#3f6212]" style={{ fontFamily: "'Merriweather', serif" }}>
                    {data?.title}
                </h2>

                <div className="flex-grow w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.data || []}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ecfccb" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#65a30d' }} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: '#f7fee7' }} />
                            <Bar dataKey="value" fill="#84cc16" radius={[8, 8, 0, 0]} barSize={60} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Grass bottom */}
                <div className="absolute bottom-0 left-0 w-full h-4 bg-[#4d7c0f]"></div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
