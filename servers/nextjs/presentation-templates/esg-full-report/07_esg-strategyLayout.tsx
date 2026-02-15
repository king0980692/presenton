import React from 'react'
import * as z from 'zod'


export const layoutId = "esg-strategy"
export const layoutName = "07. ESG Strategy Framework"
export const layoutDescription = "Pillars style layout for strategy."

export const Schema = z.object({
    vision: z.string().default("To be the global leader in sustainable innovation."),

    pillars: z.array(z.object({
        title: z.string().default("Pillar Name"),
        items: z.array(z.string()).default(["Item 1", "Item 2", "Item 3"]),
        color: z.string().default("#0052CC"),
    })).min(3).max(3).default([
        { title: "Environmental Stewardship", items: ["Carbon Neutrality", "Circular Economy", "Water Resilience"], color: "#00B8D9" },
        { title: "Social Inclusion", items: ["Diverse Workforce", "Community Care", "Human Rights"], color: "#FF5630" },
        { title: "Robust Governance", items: ["Ethical Business", "Risk Management", "Data Privacy"], color: "#36B37E" },
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
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#F4F5F7] p-16"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#172B4D] mb-4">ESG Strategic Framework</h2>
                    <div className="inline-block bg-white px-8 py-3 rounded-full shadow-sm border border-[#DFE1E6]">
                        <span className="text-lg font-bold text-[#0052CC] uppercase tracking-wider">Vision:</span>
                        <span className="text-lg text-[#172B4D] ml-2 font-light">{data?.vision}</span>
                    </div>
                </div>

                {/* Pillars Container */}
                <div className="flex justify-center items-end gap-10 h-[400px]">
                    {(data?.pillars || []).map((pillar, idx) => (
                        <div key={idx} className="w-1/3 h-full flex flex-col relative group">
                            {/* Roof/Top */}
                            <div className="h-2 w-full rounded-t" style={{ backgroundColor: pillar.color }}></div>

                            {/* Body */}
                            <div className="flex-1 bg-white shadow-md border hover:shadow-xl transition-shadow p-8 flex flex-col items-center text-center border-t-0 border-[#DFE1E6]">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6" style={{ backgroundColor: pillar.color }}>
                                    0{idx + 1}
                                </div>

                                <h3 className="text-2xl font-bold text-[#172B4D] mb-6 min-h-[4rem] flex items-center">
                                    {pillar.title}
                                </h3>

                                <ul className="space-y-3 w-full">
                                    {(pillar.items || []).map((item, i) => (
                                        <li key={i} className="text-[#5E6C84] border-b border-[#F4F5F7] pb-2 last:border-0">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Foundation */}
                <div className="w-full h-4 bg-[#172B4D] mt-2 rounded opacity-10"></div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
