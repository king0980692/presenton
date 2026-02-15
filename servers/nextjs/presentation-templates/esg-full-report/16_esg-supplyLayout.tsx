import React from 'react'
import * as z from 'zod'


export const layoutId = "esg-supply"
export const layoutName = "16. Supply Chain Management"
export const layoutDescription = "Supplier audit statistics."

export const Schema = z.object({
    title: z.string().default("Sustainable Supply Chain"),
    description: z.string().default("We work closely with our partners to ensure responsible sourcing."),

    stats: z.array(z.object({
        val: z.string().default("100%"),
        label: z.string().default("Tier 1 Suppliers Signed Code of Conduct"),
    })).min(3).max(3).default([
        { val: "100%", label: "Tier 1 Audited" },
        { val: "85%", label: "Conflict-Free Minerals" },
        { val: "300+", label: "Suppliers Trained" },
    ]),

    audit_results: z.array(z.object({
        category: z.string().default("Labor Rights"),
        pass_rate: z.string().default("98%"),
    })).min(4).max(4).default([
        { category: "Labor Rights", pass_rate: "98%" },
        { category: "Health & Safety", pass_rate: "95%" },
        { category: "Environment", pass_rate: "92%" },
        { category: "Ethics", pass_rate: "99%" },
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
                <h2 className="text-4xl font-bold text-[#172B4D] mb-4">{data?.title}</h2>
                <p className="text-xl text-[#5E6C84] mb-12">{data?.description}</p>

                {/* Top Stats */}
                <div className="flex gap-8 mb-16">
                    {(data?.stats || []).map((stat, idx) => (
                        <div key={idx} className="flex-1 bg-[#F4F5F7] p-8 rounded border-t-8 border-[#0052CC] text-center">
                            <div className="text-5xl font-bold text-[#0052CC] mb-4">{stat.val}</div>
                            <div className="text-[#172B4D] font-bold uppercase text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Audit Results */}
                <h3 className="text-2xl font-bold text-[#172B4D] mb-6">Annual Supplier Audit Results</h3>
                <div className="grid grid-cols-4 gap-6">
                    {(data?.audit_results || []).map((res, idx) => (
                        <div key={idx} className="border border-[#DFE1E6] rounded p-6 flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full border-4 border-[#36B37E] flex items-center justify-center text-2xl font-bold text-[#36B37E] mb-4">
                                {res.pass_rate}
                            </div>
                            <div className="font-bold text-[#172B4D]">{res.category}</div>
                            <div className="text-xs text-[#5E6C84] mt-1">Pass Rate</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
