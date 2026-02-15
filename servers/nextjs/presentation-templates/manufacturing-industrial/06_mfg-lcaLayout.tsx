import React from 'react'
import * as z from 'zod'


export const layoutId = "mfg-lca"
export const layoutName = "06. Product Lifecycle (LCA)"
export const layoutDescription = "Circular economy lifecycle diagram."

export const Schema = z.object({
    title: z.string().default("Circular Lifecycle Assessment"),

    stages: z.array(z.string()).min(5).max(5).default([
        "Design",
        "Manufacture",
        "Distribution",
        "Use Phase",
        "End of Life / Recycling",
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
                href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto+Condensed:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-12 flex flex-col items-center justify-center"
                style={{
                    fontFamily: "'Roboto Condensed', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold uppercase mb-16 text-[#1A1A1A]" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    {data?.title}
                </h2>

                {/* Circular Diagram */}
                <div className="relative w-[500px] h-[500px]">
                    {/* Rotating border */}
                    <div className="absolute inset-0 border-4 border-dashed border-gray-300 rounded-full animate-[spin_60s_linear_infinite]"></div>

                    {(data?.stages || []).map((stage, idx) => {
                        const angle = (idx * (360 / 5)) - 90; // Distribute 5 items
                        const radius = 220;
                        const x = radius * Math.cos((angle * Math.PI) / 180);
                        const y = radius * Math.sin((angle * Math.PI) / 180);

                        return (
                            <div
                                key={idx}
                                className="absolute w-32 h-32 flex flex-col items-center justify-center text-center transform -translate-x-1/2 -translate-y-1/2 group hover:scale-110 transition-transform cursor-pointer"
                                style={{ top: `calc(50% + ${y}px)`, left: `calc(50% + ${x}px)` }}
                            >
                                <div className="w-16 h-16 rounded-full bg-[#1A1A1A] text-[#FFD700] flex items-center justify-center font-bold text-2xl border-4 border-white shadow-lg mb-2 group-hover:bg-[#FFD700] group-hover:text-[#1A1A1A] transition-colors">
                                    0{idx + 1}
                                </div>
                                <span className="font-bold text-[#1A1A1A] text-lg uppercase bg-white px-2 py-1 shadow-sm border border-gray-200">{stage}</span>
                            </div>
                        )
                    })}

                    {/* Center Core */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="text-6xl font-bold text-[#FFD700]">♻</div>
                        <div className="text-xl font-bold text-[#1A1A1A] uppercase tracking-widest mt-2">Zero<br />Waste</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
