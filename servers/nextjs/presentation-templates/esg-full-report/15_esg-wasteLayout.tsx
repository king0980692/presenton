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

export const layoutId = "esg-waste"
export const layoutName = "15. Waste Management"
export const layoutDescription = "Stacked bar for waste type and disposal."

export const Schema = z.object({
    title: z.string().default("Waste Generation & Recycling"),

    chart_data: z.array(z.object({
        year: z.string(),
        recycling: z.number(),
        landfill: z.number(),
        incineration: z.number(),
    })).min(5).max(5).default([
        { year: "2019", recycling: 150, landfill: 80, incineration: 20 },
        { year: "2020", recycling: 160, landfill: 70, incineration: 20 },
        { year: "2021", recycling: 180, landfill: 50, incineration: 15 },
        { year: "2022", recycling: 200, landfill: 30, incineration: 10 },
        { year: "2023", recycling: 220, landfill: 10, incineration: 5 },
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
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold text-[#172B4D] mb-8">{data?.title}</h2>

                <div className="flex items-center gap-12 mb-8">
                    <div className="flex items-center gap-2 text-[#36B37E] font-bold"><div className="w-4 h-4 bg-[#36B37E]"></div>Recycled</div>
                    <div className="flex items-center gap-2 text-[#FFAB00] font-bold"><div className="w-4 h-4 bg-[#FFAB00]"></div>Landfill</div>
                    <div className="flex items-center gap-2 text-[#FF5630] font-bold"><div className="w-4 h-4 bg-[#FF5630]"></div>Incineration</div>
                </div>

                <div className="w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.chart_data || []} layout="vertical" barSize={30} barGap={0}>
                            <CartesianGrid stroke="#F4F5F7" horizontal={false} />
                            <XAxis type="number" axisLine={false} tickLine={false} />
                            <YAxis type="category" dataKey="year" axisLine={false} tickLine={false} width={80} tick={{ fontWeight: 'bold', fill: '#172B4D' }} />
                            <Tooltip cursor={{ fill: 'transparent' }} />
                            <Bar dataKey="recycling" stackId="a" fill="#36B37E" radius={[0, 4, 4, 0]} />
                            <Bar dataKey="landfill" stackId="a" fill="#FFAB00" />
                            <Bar dataKey="incineration" stackId="a" fill="#FF5630" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-8 flex justify-between items-center bg-[#F4F5F7] p-6 rounded">
                    <div className="text-lg font-bold text-[#172B4D]">Total Waste Diverted in 2023:</div>
                    <div className="text-3xl font-bold text-[#36B37E]">93.6%</div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
