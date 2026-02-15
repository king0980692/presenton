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

export const layoutId = "esg-ghg"
export const layoutName = "12. GHG Emissions"
export const layoutDescription = "Stacked bar chart for Scope 1, 2, 3."

export const Schema = z.object({
    title: z.string().default("Greenhouse Gas Emissions (ISO 14064-1)"),

    chart_data: z.array(z.object({
        year: z.string(),
        scope1: z.number(),
        scope2: z.number(),
        scope3: z.number(),
    })).min(5).max(5).default([
        { year: "2019", scope1: 120, scope2: 80, scope3: 300 },
        { year: "2020", scope1: 110, scope2: 75, scope3: 280 },
        { year: "2021", scope1: 105, scope2: 60, scope3: 290 },
        { year: "2022", scope1: 95, scope2: 50, scope3: 270 },
        { year: "2023", scope1: 85, scope2: 30, scope3: 250 },
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
                        <p className="text-[#5E6C84]">Unit: Thousand tonnes CO2e</p>
                    </div>
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#FF5630]"></div>Scope 1 (Direct)</div>
                        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#FFAB00]"></div>Scope 2 (Indirect Energy)</div>
                        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#36B37E]"></div>Scope 3 (Other Indirect)</div>
                    </div>
                </div>

                <div className="w-full h-[450px] bg-[#F4F5F7] p-8 rounded border border-[#DFE1E6]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.chart_data || []} barSize={50}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} dy={10} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: '#EBECF0' }} />
                            <Bar dataKey="scope1" stackId="a" fill="#FF5630" />
                            <Bar dataKey="scope2" stackId="a" fill="#FFAB00" />
                            <Bar dataKey="scope3" stackId="a" fill="#36B37E" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <p className="mt-8 text-sm text-[#6B778C] text-center italic">
                    *Scope 2 emissions are calculated using the market-based method.
                </p>
            </div>
        </>
    )
}

export default DynamicSlideLayout
