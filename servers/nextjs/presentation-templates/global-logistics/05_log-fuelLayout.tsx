import React from 'react'
import * as z from 'zod'


export const layoutId = "log-fuel"
export const layoutName = "05. Alternative Fuels"
export const layoutDescription = "Icon grid for fuels."

export const Schema = z.object({
    title: z.string().default("Beyond Diesel"),

    fuels: z.array(z.string()).min(3).max(3).default([
        "Sustainable Aviation Fuel (SAF)",
        "Green Hydrogen (H2)",
        "Bio-LNG (Biomethane)",
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#e2e8f0] p-20 flex flex-col justify-center"
                style={{
                    fontFamily: "'Roboto Mono', monospace",
                }}
            >
                <h2 className="text-6xl font-black uppercase italic mb-16 text-center text-[#0f172a]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="flex gap-8 justify-center">
                    {(data?.fuels || []).map((fuel, idx) => (
                        <div key={idx} className="bg-white p-10 w-80 text-center shadow-[10px_10px_0px_rgba(15,23,42,1)] border-2 border-black hover:-translate-y-2 transition-transform">
                            <div className="text-6xl mb-6">
                                {idx === 0 && "✈️"}
                                {idx === 1 && "💧"}
                                {idx === 2 && "⛽"}
                            </div>
                            <div className="font-bold uppercase text-lg leading-tight">{fuel}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
