import React from 'react'
import * as z from 'zod'
import {
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    ResponsiveContainer
} from 'recharts'

export const layoutId = "esg-dei"
export const layoutName = "18. Diversity, Equity & Inclusion"
export const layoutDescription = "Charts for gender and diversity stats."

export const Schema = z.object({
    title: z.string().default("Diversity & Inclusion"),

    gender_data: z.array(z.object({
        name: z.string(),
        value: z.number(),
    })).min(2).max(2).default([
        { name: "Male", value: 55 },
        { name: "Female", value: 45 },
    ]),

    mgmt_gender_data: z.array(z.object({
        name: z.string(),
        value: z.number(),
    })).min(2).max(2).default([
        { name: "Male", value: 65 },
        { name: "Female", value: 35 },
    ]),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const COLORS = ['#0052CC', '#FF5630'];

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
                <h2 className="text-4xl font-bold text-[#172B4D] mb-4 text-center">{data?.title}</h2>
                <p className="text-center text-[#5E6C84] mb-12">Building a workplace where everyone belongs.</p>

                <div className="grid grid-cols-2 gap-16">
                    {/* All Employees Chart */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-bold text-[#172B4D] mb-6">Total Workforce</h3>
                        <div className="w-64 h-64 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data?.gender_data || []}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {(data?.gender_data || []).map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-[#172B4D]">
                                {(data?.gender_data?.[1]?.value || 0)}%
                                <div className="text-xs text-[#5E6C84] font-normal">Female</div>
                            </div>
                        </div>
                    </div>

                    {/* Management Chart */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-bold text-[#172B4D] mb-6">Management Roles</h3>
                        <div className="w-64 h-64 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data?.mgmt_gender_data || []}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {(data?.mgmt_gender_data || []).map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-[#172B4D]">
                                {(data?.mgmt_gender_data?.[1]?.value || 0)}%
                                <div className="text-xs text-[#5E6C84] font-normal">Female</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-12 gap-8">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#0052CC]"></div>Male</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#FF5630]"></div>Female</div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
