import React from 'react'
import * as z from 'zod'


export const layoutId = "health-map"
export const layoutName = "03. Global Health Reach"
export const layoutDescription = "World map with pulse points."

export const Schema = z.object({
    title: z.string().default("Global Reach"),

    description: z.string().default("Serving over 10 million patients across 5 continents."),

    stats: z.array(z.object({
        val: z.string().default("10M+"),
        label: z.string().default("Patients Served"),
    })).min(3).max(3).default([
        { val: "10M+", label: "Patients Served" },
        { val: "50+", label: "Countries" },
        { val: "200+", label: "R&D Labs" },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white px-20 py-16"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            {data?.title}
                        </h2>
                        <p className="text-xl text-teal-600">{data?.description}</p>
                    </div>

                    <div className="flex gap-8">
                        {(data?.stats || []).map((stat, idx) => (
                            <div key={idx} className="text-right">
                                <div className="text-4xl font-bold text-gray-800">{stat.val}</div>
                                <div className="text-xs uppercase text-gray-400 font-bold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full h-[400px] bg-teal-50 rounded-2xl relative overflow-hidden">
                    {/* Map Graphic (Abstract) */}
                    <div className="absolute inset-0 opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-contain bg-no-repeat bg-center mix-blend-multiply"></div>

                    {/* Pulse Points */}
                    <div className="absolute top-[40%] left-[25%] flex items-center justify-center">
                        <div className="w-4 h-4 bg-red-500 rounded-full z-10"></div>
                        <div className="w-12 h-12 bg-red-500 rounded-full animate-ping absolute opacity-50"></div>
                    </div>
                    <div className="absolute top-[30%] left-[50%] flex items-center justify-center">
                        <div className="w-4 h-4 bg-red-500 rounded-full z-10"></div>
                        <div className="w-12 h-12 bg-red-500 rounded-full animate-ping absolute opacity-50 animation-delay-500"></div>
                    </div>
                    <div className="absolute top-[60%] right-[20%] flex items-center justify-center">
                        <div className="w-4 h-4 bg-red-500 rounded-full z-10"></div>
                        <div className="w-12 h-12 bg-red-500 rounded-full animate-ping absolute opacity-50 animation-delay-1000"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
