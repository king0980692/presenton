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
    PieChart,
    Pie,
    Cell
} from 'recharts'

export const layoutId = "organic-charts"
export const layoutName = "07. Organic Data Charts"
export const layoutDescription = "Data visualization with natural colors."

export const Schema = z.object({
    chart_title: z.string().default("Environmental Metrics"),

    bar_data: z.array(z.object({
        name: z.string(),
        val: z.number()
    })).min(3).max(5).default([
        { name: "2021", val: 400 },
        { name: "2022", val: 300 },
        { name: "2023", val: 200 },
        { name: "2024", val: 150 },
    ]),

    pie_data: z.array(z.object({
        name: z.string(),
        val: z.number()
    })).min(3).max(4).default([
        { name: "Solar", val: 45 },
        { name: "Wind", val: 35 },
        { name: "Hydro", val: 20 },
    ]),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    const COLORS = ['#66BB6A', '#26A69A', '#8D6E63', '#FFA726']; // Green, Teal, Earth, Orange

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Open+Sans:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#FDFBF7]"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <div className="p-12 h-full flex flex-col">
                    <h2 className="text-4xl font-bold mb-2 text-[#1B5E20]" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.chart_title || "Environmental Metrics"}
                    </h2>
                    <p className="mb-10 text-[#78909C]">Tracking our progress towards a greener future.</p>

                    <div className="flex-1 grid grid-cols-2 gap-12">
                        {/* Bar Chart */}
                        <div className="bg-white p-8 rounded-[30px] shadow-sm flex flex-col">
                            <h3 className="text-xl font-bold mb-4 text-[#33691E]">Emissions Reduction (CO2)</h3>
                            <div className="flex-1 min-h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data?.bar_data || []}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#546E7A' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#546E7A' }} />
                                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                                        <Bar dataKey="val" fill="#81C784" radius={[10, 10, 0, 0]} barSize={50} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Pie Chart */}
                        <div className="bg-white p-8 rounded-[30px] shadow-sm flex flex-col">
                            <h3 className="text-xl font-bold mb-4 text-[#33691E]">Renewable Energy Mix</h3>
                            <div className="flex-1 min-h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data?.pie_data || []}
                                            cx="50%" cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="val"
                                        >
                                            {(data?.pie_data || []).map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                                    </PieChart>
                                </ResponsiveContainer>

                                {/* Custom Legend */}
                                <div className="flex justify-center gap-4 mt-4">
                                    {(data?.pie_data || []).map((entry, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                            <span className="text-sm text-[#546E7A]">{entry.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
