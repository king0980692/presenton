import React from 'react'
import * as z from 'zod'


export const layoutId = "esg-index"
export const layoutName = "20. GRI Content Index"
export const layoutDescription = "GRI Table layout."

export const Schema = z.object({
    title: z.string().default("GRI Content Index"),

    rows: z.array(z.object({
        gri: z.string().default("GRI 2-1"),
        desc: z.string().default("Organizational details"),
        page: z.string().default("p. 5"),
        omission: z.string().default("-"),
    })).min(8).max(10).default([
        { gri: "GRI 2-1", desc: "Organizational details", page: "p. 5", omission: "-" },
        { gri: "GRI 2-6", desc: "Activities, value chain", page: "p. 9", omission: "-" },
        { gri: "GRI 2-7", desc: "Employees", page: "p. 17", omission: "-" },
        { gri: "GRI 2-9", desc: "Governance structure", page: "p. 8", omission: "-" },
        { gri: "GRI 2-22", desc: "Statement on sustainability", page: "p. 6", omission: "-" },
        { gri: "GRI 3-1", desc: "Process to determine material topics", page: "p. 4", omission: "-" },
        { gri: "GRI 305-1", desc: "Direct (Scope 1) GHG emissions", page: "p. 12", omission: "-" },
        { gri: "GRI 305-2", desc: "Energy indirect (Scope 2) GHG emissions", page: "p. 12", omission: "-" },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold text-[#172B4D] mb-8">{data?.title}</h2>

                <div className="w-full overflow-hidden border border-[#DFE1E6] rounded text-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F4F5F7] text-[#172B4D]">
                                <th className="p-3 w-1/6 font-bold border-r border-[#DFE1E6] border-b">GRI Standard</th>
                                <th className="p-3 w-1/2 font-bold border-r border-[#DFE1E6] border-b">Disclosure</th>
                                <th className="p-3 w-1/6 font-bold border-r border-[#DFE1E6] border-b">Page Number</th>
                                <th className="p-3 w-1/6 font-bold border-b">Omission</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#172B4D]">
                            {(data?.rows || []).map((row, idx) => (
                                <tr key={idx} className="border-b border-[#DFE1E6] last:border-0 hover:bg-[#F4F5F7]">
                                    <td className="p-3 border-r border-[#DFE1E6] font-bold text-[#0052CC]">{row.gri}</td>
                                    <td className="p-3 border-r border-[#DFE1E6]">{row.desc}</td>
                                    <td className="p-3 border-r border-[#DFE1E6] font-medium">{row.page}</td>
                                    <td className="p-3 text-[#5E6C84]">{row.omission}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 text-xs text-[#5E6C84]">
                    This report has been prepared in accordance with the GRI Standards: Core option. <br />
                    For the full GRI Content Index, please refer to the Appendix.
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
