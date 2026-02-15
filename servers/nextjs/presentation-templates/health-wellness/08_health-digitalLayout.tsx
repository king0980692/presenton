import React from 'react'
import * as z from 'zod'
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts'

export const layoutId = "health-digital"
export const layoutName = "08. Digital Health Utilization"
export const layoutDescription = "Line chart for telehealth adoption."

export const Schema = z.object({
    title: z.string().default("Digital Health Adoption"),

    data: z.array(z.object({
        year: z.string(),
        users: z.number(),
    })).min(5).max(5).default([
        { year: "2019", users: 100 },
        { year: "2020", users: 500 },
        { year: "2021", users: 800 },
        { year: "2022", users: 950 },
        { year: "2023", users: 1200 },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {data?.title}
                    </h2>
                    <p className="text-gray-500">Telehealth Consultations (Thousands)</p>
                </div>

                <div className="w-full h-[400px] bg-indigo-50/50 rounded-2xl p-6">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data?.data || []}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E7FF" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} dy={10} tick={{ fill: '#4F46E5', fontWeight: 'bold' }} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Line type="monotone" dataKey="users" stroke="#4F46E5" strokeWidth={5} dot={{ r: 6, strokeWidth: 3, fill: 'white' }} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
