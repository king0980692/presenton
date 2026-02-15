import React from 'react'
import * as z from 'zod'


export const layoutId = "mfg-rnd"
export const layoutName = "12. R&D Pipeline"
export const layoutDescription = "Progress bars for innovation projects."

export const Schema = z.object({
    title: z.string().default("Innovation Pipeline"),

    projects: z.array(z.object({
        name: z.string().default("Project"),
        phase: z.string().default("Phase"),
        progress: z.number().default(50),
    })).min(4).max(4).default([
        { name: "Hydrogen Furnace", phase: "Pilot Testing", progress: 80 },
        { name: "Bio-Based Polymers", phase: "Lab Research", progress: 40 },
        { name: "AI Predictive Maintenance", phase: "Deployment", progress: 95 },
        { name: "Carbon Capture Tech", phase: "Feasibility", progress: 20 },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white text-[#1A1A1A] p-16"
                style={{
                    fontFamily: "'Roboto Condensed', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold uppercase mb-16 border-l-8 border-[#FFD700] pl-6" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="space-y-10">
                    {(data?.projects || []).map((proj, idx) => (
                        <div key={idx} className="group">
                            <div className="flex justify-between mb-2">
                                <div className="flex items-baseline gap-4">
                                    <h3 className="text-2xl font-bold uppercase">{proj.name}</h3>
                                    <span className="text-sm bg-gray-200 px-2 py-1 rounded font-bold text-gray-600">{proj.phase}</span>
                                </div>
                                <div className="text-2xl font-bold text-[#FFD700]">{proj.progress}%</div>
                            </div>

                            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#1A1A1A] group-hover:bg-[#FFD700] transition-colors"
                                    style={{ width: `${proj.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
