import React from 'react'
import * as z from 'zod'
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts'

export const layoutId = "esg-energy"
export const layoutName = "13. Energy Management"
export const layoutDescription = "Dual axis chart: consumption vs intensity."

export const Schema = z.object({
    title: z.string().default("Energy Consumption & Intensity"),

    chart_data: z.array(z.object({
        year: z.string(),
        consumption: z.number(), // Bar
        intensity: z.number(),   // Line
    })).min(5).max(5).default([
        { year: "2019", consumption: 500, intensity: 1.2 },
        { year: "2020", consumption: 480, intensity: 1.1 },
        { year: "2021", consumption: 510, intensity: 1.05 },
        { year: "2022", consumption: 470, intensity: 0.95 },
        { year: "2023", consumption: 450, intensity: 0.85 },
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
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <h2 className="text-4xl font-bold text-[#172B4D] mb-2">{data?.title}</h2>
                        <p className="text-[#5E6C84]">Absolute Consumption (GJ) vs. Intensity (GJ/Revenue)</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2 font-bold text-[#0052CC]"><div className="w-8 h-1 bg-[#0052CC]"></div>Intensity</div>
                        <div className="flex items-center gap-2 font-bold text-[#6554C0]"><div className="w-4 h-4 bg-[#6554C0]"></div>Consumption</div>
                    </div>
                </div>

                <div className="w-full h-[450px] bg-white p-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={data?.chart_data || []}>
                            <CartesianGrid stroke="#F4F5F7" vertical={false} />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} dy={10} scale="point" padding={{ left: 30, right: 30 }} />
                            <YAxis yAxisId="left" orientation="left" stroke="#6554C0" axisLine={false} tickLine={false} />
                            <YAxis yAxisId="right" orientation="right" stroke="#0052CC" axisLine={false} tickLine={false} domain={[0, 1.5]} />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />

                            <Bar yAxisId="left" dataKey="consumption" fill="#6554C0" barSize={40} radius={[4, 4, 0, 0]} />
                            <Line yAxisId="right" type="monotone" dataKey="intensity" stroke="#0052CC" strokeWidth={4} dot={{ r: 6, fill: '#fff', strokeWidth: 3 }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
