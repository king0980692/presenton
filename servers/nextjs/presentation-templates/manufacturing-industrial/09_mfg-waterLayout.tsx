import React from 'react'
import * as z from 'zod'


export const layoutId = "mfg-water"
export const layoutName = "09. Water Recycling"
export const layoutDescription = "Process diagram for water treatment."

export const Schema = z.object({
    title: z.string().default("Closed-Loop Water System"),

    stats: z.object({
        recycled: z.string().default("85%"),
        fresh: z.string().default("15%"),
        volume: z.string().default("500ML"),
    }).default({ recycled: "85%", fresh: "15%", volume: "500ML" }),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#E0F2FE] p-16"
                style={{
                    fontFamily: "'Roboto Condensed', sans-serif",
                }}
            >
                <div className="flex h-full">
                    <div className="w-[40%] pr-16 border-r border-[#0284C7]/30 flex flex-col justify-center">
                        <h2 className="text-5xl font-bold uppercase text-[#0369A1] mb-8 leading-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
                            {data?.title}
                        </h2>

                        <div className="space-y-8">
                            <div>
                                <div className="text-6xl font-bold text-[#0284C7]">{data?.stats?.recycled}</div>
                                <div className="text-lg font-bold uppercase text-[#0C4A6E]">Water Recycled</div>
                            </div>
                            <div>
                                <div className="text-6xl font-bold text-[#7DD3FC]">{data?.stats?.fresh}</div>
                                <div className="text-lg font-bold uppercase text-[#0C4A6E]">Fresh Intake</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-[#0369A1]">{data?.stats?.volume}</div>
                                <div className="text-sm font-bold uppercase text-[#0C4A6E]">Total Annual Volume</div>
                            </div>
                        </div>
                    </div>

                    <div className="w-[60%] relative flex items-center justify-center pl-10">
                        {/* Simplified Piping Diagram */}
                        <div className="relative w-full h-[80%] border-4 border-[#0284C7] rounded-xl p-6 bg-white shadow-xl flex items-center justify-center">
                            <div className="absolute top-0 -left-6 bg-[#0284C7] text-white px-4 py-1 font-bold rounded">INFLOW</div>
                            <div className="absolute bottom-0 -right-6 bg-[#0369A1] text-white px-4 py-1 font-bold rounded">OUTFLOW (Treated)</div>

                            <div className="grid grid-cols-2 gap-8 w-full">
                                <div className="bg-[#BAE6FD] p-6 rounded text-center font-bold text-[#0369A1] border-2 border-[#0284C7]">Production</div>
                                <div className="bg-[#7DD3FC] p-6 rounded text-center font-bold text-[#0369A1] border-2 border-[#0284C7]">Filtration</div>
                                <div className="bg-[#38BDF8] p-6 rounded text-center font-bold text-white border-2 border-[#0284C7]">Treatment</div>
                                <div className="bg-[#0EA5E9] p-6 rounded text-center font-bold text-white border-2 border-[#0284C7]">Testing</div>
                            </div>

                            {/* Looping arrows simulation */}
                            <div className="absolute inset-0 pointer-events-none border-[8px] border-dashed border-[#0284C7]/20 rounded-xl m-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
