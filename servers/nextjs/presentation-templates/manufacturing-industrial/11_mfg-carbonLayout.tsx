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

export const layoutId = "mfg-carbon"
export const layoutName = "11. Carbon Footprint Breakdown"
export const layoutDescription = "Stacked bar for emissions by facility."

export const Schema = z.object({
    title: z.string().default("GHG Emissions by Facility"),

    chart_data: z.array(z.object({
        facility: z.string(),
        direct: z.number(), // Scope 1
        indirect: z.number(), // Scope 2
    })).min(5).max(5).default([
        { facility: "Plant A (Smelting)", direct: 120, indirect: 30 },
        { facility: "Plant B (Refining)", direct: 90, indirect: 50 },
        { facility: "Plant C (Assembly)", direct: 40, indirect: 80 },
        { facility: "Plant D (Packaging)", direct: 20, indirect: 20 },
        { facility: "Logistics Hub", direct: 60, indirect: 10 },
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
                href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto+Condensed:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#2D2D2D] text-white p-12"
                style={{
                    fontFamily: "'Roboto Condensed', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold uppercase mb-12 text-[#FFD700] border-b border-gray-600 pb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="flex gap-12">
                    <div className="w-[70%] h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data?.chart_data || []} layout="vertical" barSize={30}>
                                <CartesianGrid stroke="#444" horizontal={false} />
                                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                <YAxis type="category" dataKey="facility" axisLine={false} tickLine={false} width={120} tick={{ fill: 'white', fontWeight: 'bold' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #FFD700' }} />
                                <Bar dataKey="direct" stackId="a" fill="#EF4444" name="Scope 1 (Direct)" />
                                <Bar dataKey="indirect" stackId="a" fill="#3B82F6" name="Scope 2 (Energy)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="w-[30%] flex flex-col justify-center space-y-8 pl-8 border-l border-gray-600">
                        <div>
                            <div className="text-4xl font-bold text-[#EF4444]">65%</div>
                            <div className="text-sm uppercase text-gray-400">Direct Emissions (Fuel)</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-[#3B82F6]">35%</div>
                            <div className="text-sm uppercase text-gray-400">Indirect Emissions (Grid)</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
