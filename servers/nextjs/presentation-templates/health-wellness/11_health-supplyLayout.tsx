import React from 'react'
import * as z from 'zod'


export const layoutId = "health-supply"
export const layoutName = "11. Cold Chain Logistics"
export const layoutDescription = "Flowchart for temperature controlled supply."

export const Schema = z.object({
    title: z.string().default("Resilient Supply Chain"),

    stages: z.array(z.object({
        label: z.string().default("Stage"),
        temp: z.string().default("-20°C"),
    })).min(4).max(4).default([
        { label: "Manufacturing", temp: "Controlled Room Temp" },
        { label: "Cold Storage Hub", temp: "-20°C Deep Freeze" },
        { label: "Specialized Transport", temp: "2-8°C Refrigerated" },
        { label: "Patient Delivery", temp: "Last Mile Secure" },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold text-gray-800 mb-20 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="flex justify-between items-center relative px-10">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-2 bg-blue-100 -z-10 rounded-full"></div>

                    {(data?.stages || []).map((stage, idx) => (
                        <div key={idx} className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg border border-blue-50 w-60 relative group hover:-translate-y-2 transition-transform">
                            <div className="w-16 h-16 bg-blue-500 rounded-full text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-md absolute -top-8 border-4 border-white">
                                {idx + 1}
                            </div>

                            <div className="mt-6 text-center">
                                <div className="font-bold text-gray-800 text-lg mb-2">{stage.label}</div>
                                <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    {stage.temp}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center text-gray-400 font-light flex items-center justify-center gap-2">
                    <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                    99.98% Temperature Excursion-Free Shipments in 2023
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
