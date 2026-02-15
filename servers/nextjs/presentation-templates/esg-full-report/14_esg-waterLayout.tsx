import React from 'react'
import * as z from 'zod'
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from 'recharts'

export const layoutId = "esg-water"
export const layoutName = "14. Water Management"
export const layoutDescription = "Pie chart for water withdrawal sources."

export const Schema = z.object({
    title: z.string().default("Water Withdrawal by Source"),

    chart_data: z.array(z.object({
        name: z.string(),
        value: z.number(),
    })).min(4).max(4).default([
        { name: "Municipal Water", value: 65 },
        { name: "Groundwater", value: 15 },
        { name: "Rainwater", value: 10 },
        { name: "Recycled Water", value: 10 },
    ]),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const COLORS = ['#0052CC', '#00B8D9', '#36B37E', '#FFAB00'];

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white px-20 py-12"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold text-[#172B4D] mb-4 border-l-8 border-[#00B8D9] pl-6">
                    {data?.title}
                </h2>

                <div className="flex items-center h-[500px]">
                    {/* Chart Side */}
                    <div className="w-1/2 h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data?.chart_data || []}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={100}
                                    outerRadius={160}
                                    fill="#8884d8"
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {(data?.chart_data || []).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Legend Side */}
                    <div className="w-1/2 flex flex-col justify-center gap-6 pl-10">
                        {(data?.chart_data || []).map((entry, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-[#F4F5F7] rounded border border-[#DFE1E6]">
                                <div className="flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                    <span className="text-xl font-bold text-[#172B4D]">{entry.name}</span>
                                </div>
                                <span className="text-2xl font-bold text-[#5E6C84]">{entry.value}%</span>
                            </div>
                        ))}

                        <div className="mt-8 p-6 bg-[#E3FCEF] text-[#006644] rounded">
                            <h3 className="font-bold mb-2 text-lg">Did you know?</h3>
                            <p>We aim to increase our recycled water usage to 30% by 2025 through advanced filtration systems.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
