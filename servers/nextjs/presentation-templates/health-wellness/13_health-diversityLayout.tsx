import React from 'react'
import * as z from 'zod'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from 'recharts'

export const layoutId = "health-diversity"
export const layoutName = "13. Diverse Care Teams"
export const layoutDescription = "Gender and ethnicity charts."

export const Schema = z.object({
    title: z.string().default("Diversity in Care"),

    gender: z.array(z.object({ name: z.string(), value: z.number(), color: z.string() })).min(2).max(2).default([
        { name: "Female", value: 65, color: "#EC4899" },
        { name: "Male", value: 35, color: "#3B82F6" },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16 flex flex-col items-center"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {data?.title}
                </h2>
                <p className="text-xl text-gray-500 mb-12">Reflecting the diverse communities we serve.</p>

                <div className="w-[500px] h-[500px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data?.gender || []}
                                cx="50%"
                                cy="50%"
                                innerRadius={160}
                                outerRadius={200}
                                startAngle={180}
                                endAngle={0}
                                paddingAngle={0}
                                dataKey="value"
                            >
                                {(data?.gender || []).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full flex justify-between px-20">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-pink-500">{(data?.gender?.[0]?.value || 0)}%</div>
                            <div className="text-gray-400 font-bold uppercase tracking-widest mt-2">{data?.gender?.[0]?.name}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-blue-500">{(data?.gender?.[1]?.value || 0)}%</div>
                            <div className="text-gray-400 font-bold uppercase tracking-widest mt-2">{data?.gender?.[1]?.name}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
