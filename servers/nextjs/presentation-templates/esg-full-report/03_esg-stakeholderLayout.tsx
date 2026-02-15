import React from 'react'
import * as z from 'zod'


export const layoutId = "esg-stakeholder"
export const layoutName = "03. Stakeholder Engagement"
export const layoutDescription = "Table layout for stakeholders."

export const Schema = z.object({
    title: z.string().default("Stakeholder Engagement"),

    rows: z.array(z.object({
        stakeholder: z.string().default("Group"),
        channel: z.string().default("Communication Channel"),
        concern: z.string().default("Key Concerns"),
    })).min(5).max(5).default([
        { stakeholder: "Employees", channel: "Town Halls, Intranet", concern: "Career Development, Safety" },
        { stakeholder: "Customers", channel: "Surveys, Service Hotline", concern: "Product Quality, Privacy" },
        { stakeholder: "Investors", channel: "Annual Meetings, Reports", concern: "Governance, Profitability" },
        { stakeholder: "Suppliers", channel: "Audits, Conferences", concern: "Fair Trade, Stability" },
        { stakeholder: "Community", channel: "Forums, Charity Events", concern: "Environmental Impact" },
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
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&family=Open+Sans:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white px-20 py-16"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold text-[#172B4D] mb-10 border-l-8 border-[#0052CC] pl-6">
                    {data?.title}
                </h2>

                <div className="w-full overflow-hidden rounded border border-[#DFE1E6]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#0052CC] text-white">
                                <th className="p-4 w-1/4 font-bold border-r border-[#0065FF]">Stakeholder Group</th>
                                <th className="p-4 w-1/3 font-bold border-r border-[#0065FF]">Communication Channels</th>
                                <th className="p-4 w-1/3 font-bold">Key Topics of Concern</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#172B4D]">
                            {(data?.rows || []).map((row, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#F4F5F7]"}>
                                    <td className="p-4 border-r border-[#DFE1E6] font-semibold">{row.stakeholder}</td>
                                    <td className="p-4 border-r border-[#DFE1E6]">{row.channel}</td>
                                    <td className="p-4">{row.concern}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
