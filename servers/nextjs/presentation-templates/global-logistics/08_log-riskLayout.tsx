import React from 'react'
import * as z from 'zod'


export const layoutId = "log-risk"
export const layoutName = "08. Resilience"
export const layoutDescription = "Heatmap grid."

export const Schema = z.object({
    title: z.string().default("Supply Chain Risk"),

    risks: z.array(z.object({
        name: z.string(),
        level: z.string(), // Low, Med, High
    })).min(4).max(4).default([
        { name: "Geopolitical", level: "High" },
        { name: "Climate Disruption", level: "Med" },
        { name: "Cybersecurity", level: "High" },
        { name: "Labor Shortage", level: "Med" },
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
                href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Roboto+Mono:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-20 flex flex-col justify-center"
                style={{
                    fontFamily: "'Roboto Mono', monospace",
                }}
            >
                <h2 className="text-5xl font-black uppercase italic mb-16 text-[#0f172a]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="grid grid-cols-2 gap-8">
                    {(data?.risks || []).map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between border-b-2 border-gray-200 pb-4">
                            <div className="text-xl font-bold text-gray-700">{item.name}</div>
                            <div className={`px-4 py-1 font-bold text-white uppercase text-sm rounded ${item.level === 'High' ? 'bg-red-600' :
                                    item.level === 'Med' ? 'bg-yellow-500' : 'bg-green-500'
                                }`}>
                                {item.level} Priority
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-gray-100 p-6 text-sm text-gray-500 border-l-4 border-black">
                    Action Plan: Diversify multi-modal routes and enhance digital twin monitoring.
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
