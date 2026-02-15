import React from 'react'
import * as z from 'zod'


export const layoutId = "health-pandemic"
export const layoutName = "16. Pandemic Response"
export const layoutDescription = "Timeline of rapid response."

export const Schema = z.object({
    title: z.string().default("Crisis Response Timeline"),

    events: z.array(z.object({
        month: z.string().default("Month"),
        action: z.string().default("Action Taken"),
    })).min(4).max(4).default([
        { month: "Jan", action: "Emergency Task Force Activated" },
        { month: "Mar", action: "Telehealth Capacity Double" },
        { month: "Jun", action: "Vaccine Distribution Hubs Live" },
        { month: "Dec", action: "1 Million Doses Administered" },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-20 flex flex-col justify-center"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold text-gray-800 mb-16 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="relative">
                    {/* Center Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 transform -translate-y-1/2 z-0"></div>

                    <div className="flex justify-between relative z-10">
                        {(data?.events || []).map((ev, idx) => (
                            <div key={idx} className="flex flex-col items-center w-60">
                                {/* Circle Node */}
                                <div className="w-8 h-8 rounded-full bg-white border-4 border-red-500 shadow-md mb-6 z-10"></div>

                                {/* Content Alternating */}
                                <div className={`absolute w-60 text-center ${idx % 2 === 0 ? '-top-24' : 'top-16'}`}>
                                    <div className="text-2xl font-bold text-red-500 mb-1">{ev.month}</div>
                                    <div className="text-gray-700 font-medium leading-tight">{ev.action}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
