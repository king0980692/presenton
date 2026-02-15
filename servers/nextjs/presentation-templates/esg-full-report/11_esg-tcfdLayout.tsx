import React from 'react'
import * as z from 'zod'


export const layoutId = "esg-tcfd"
export const layoutName = "11. TCFD Climate Risks"
export const layoutDescription = "Table for climate risks and financial impact."

export const Schema = z.object({
    title: z.string().default("Climate-Related Risks & Opportunities (TCFD)"),

    rows: z.array(z.object({
        type: z.string().default("Physical / Transition"),
        risk: z.string().default("Risk Description"),
        impact: z.string().default("Financial Impact"),
        mitigation: z.string().default("Mitigation Strategy"),
    })).min(4).max(4).default([
        { type: "Transition (Policy)", risk: "Increased carbon pricing in key markets.", impact: "Higher operational costs ($5M/yr).", mitigation: "Invest in renewable energy and efficiency." },
        { type: "Transition (Market)", risk: "Shift in customer preference for green products.", impact: "Potential revenue loss if portfolio lags.", mitigation: "Accelerate R&D in eco-friendly products." },
        { type: "Physical (Acute)", risk: "Extreme weather events disrupting supply chain.", impact: "Production downtime, revenue risk.", mitigation: "Diversify suppliers, reinforce logistics." },
        { type: "Physical (Chronic)", risk: "Rising temperatures increasing cooling costs.", impact: "Increased energy OPEX.", mitigation: "Upgrade cooling systems, green building design." },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold text-[#172B4D] mb-12 border-b border-[#DFE1E6] pb-4">
                    {data?.title}
                </h2>

                <div className="w-full border border-[#DFE1E6] rounded overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#0052CC] text-white">
                                <th className="p-4 w-1/6 font-bold border-r border-[#0065FF]">Risk Type</th>
                                <th className="p-4 w-1/3 font-bold border-r border-[#0065FF]">Description of Risk</th>
                                <th className="p-4 w-1/4 font-bold border-r border-[#0065FF]">Potential Financial Impact</th>
                                <th className="p-4 w-1/4 font-bold">Mitigation Strategy</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#172B4D]">
                            {(data?.rows || []).map((row, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#F4F5F7]"}>
                                    <td className="p-4 border-r border-[#DFE1E6] font-bold text-[#0052CC]">{row.type}</td>
                                    <td className="p-4 border-r border-[#DFE1E6] font-medium">{row.risk}</td>
                                    <td className="p-4 border-r border-[#DFE1E6] text-[#DE350B]">{row.impact}</td>
                                    <td className="p-4 text-[#36B37E] font-medium">{row.mitigation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 p-4 bg-[#DEEBFF] text-[#0052CC] rounded text-sm font-semibold flex items-center gap-2">
                    <span className="text-xl">ℹ️</span>
                    TCFD: Task Force on Climate-related Financial Disclosures aligned.
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
