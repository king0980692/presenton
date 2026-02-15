import React from 'react'
import * as z from 'zod'


export const layoutId = "fin-tcfd"
export const layoutName = "11. TCFD Scenario Analysis"
export const layoutDescription = "Text table for climate scenarios."

export const Schema = z.object({
    title: z.string().default("Climate Risk Scenarios (TCFD)"),

    scenarios: z.array(z.object({
        name: z.string().default("Scenario"),
        temp: z.string().default("1.5°C"),
        impact: z.string().default("Impact Description"),
    })).min(3).max(3).default([
        { name: "Orderly Transition", temp: "< 2°C", impact: "High transition risks, low physical risks. Carbon pricing increases." },
        { name: "Disorderly Transition", temp: "~ 2°C", impact: "Volatile policy changes. Asset stranding in fossil fuel sectors." },
        { name: "Hot House World", temp: "> 3°C", impact: "Severe physical risks. Supply chain disruptions and property damage." },
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
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <h2 className="text-4xl font-serif text-[#064e3b] mb-12 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {data?.title}
                </h2>

                <div className="border-t border-[#064e3b]">
                    {(data?.scenarios || []).map((scen, idx) => (
                        <div key={idx} className="flex border-b border-gray-200 py-8 hover:bg-gray-50 transition-colors">
                            <div className="w-1/4">
                                <h3 className="text-xl font-bold text-[#064e3b] font-serif">{scen.name}</h3>
                                <span className="inline-block mt-2 bg-gray-100 text-gray-600 text-xs px-2 py-1 font-bold rounded">
                                    Temp Rise: {scen.temp}
                                </span>
                            </div>
                            <div className="w-3/4 pl-8 border-l border-gray-200 text-gray-600 leading-relaxed font-light text-lg flex items-center">
                                {scen.impact}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-sm text-gray-400 font-light italic">
                    *Based on NGFS (Network for Greening the Financial System) standard scenarios.
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
