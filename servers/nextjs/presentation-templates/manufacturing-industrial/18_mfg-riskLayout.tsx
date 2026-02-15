import React from 'react'
import * as z from 'zod'


export const layoutId = "mfg-risk"
export const layoutName = "18. Risk Heatmap"
export const layoutDescription = "Grid heatmap for risk assessment."

export const Schema = z.object({
    title: z.string().default("Risk Management Framework"),

    cells: z.array(z.object({
        label: z.string().default("Risk"),
        level: z.enum(["Low", "Med", "High"]).default("Low"),
    })).min(9).max(9).default([
        { label: "Currency Fluctuation", level: "Med" },
        { label: "Supply Chain Disruption", level: "High" },
        { label: "Regulatory Change", level: "Med" },

        { label: "Cyber Security", level: "High" },
        { label: "Talent Retention", level: "Med" },
        { label: "Operational Safety", level: "Low" },

        { label: "Climate Transition", level: "High" },
        { label: "Market Demand", level: "Low" },
        { label: "Geopolitical", level: "Med" },
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
                <h2 className="text-4xl font-bold uppercase mb-12" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="grid grid-cols-3 gap-1 w-full max-w-4xl mx-auto border-4 border-[#1A1A1A]">
                    {(data?.cells || []).map((cell, idx) => {
                        let bg = '#CEFAD0'; // Low
                        if (cell.level === 'Med') bg = '#FEF08A'; // Med
                        if (cell.level === 'High') bg = '#FCA5A5'; // High

                        return (
                            <div key={idx} className="aspect-video flex items-center justify-center font-bold uppercase text-center p-4" style={{ backgroundColor: bg }}>
                                {cell.label}
                            </div>
                        )
                    })}
                </div>

                <div className="flex justify-center gap-8 mt-6 text-xs font-bold uppercase">
                    <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#CEFAD0] border border-black"></div>Low Risk</div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#FEF08A] border border-black"></div>Medium Risk</div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#FCA5A5] border border-black"></div>High Risk</div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
