import React from 'react'
import * as z from 'zod'


export const layoutId = "corp-structure"
export const layoutName = "05. Corporate ESG Pillars"
export const layoutDescription = "Stacked blocks strategy layout."

export const Schema = z.object({
    title: z.string().default("Strategic Pillars"),

    pillars: z.array(z.object({
        title: z.string().default("Pillar Title"),
        desc: z.string().default("Description of the pillar."),
    })).min(3).max(3).default([
        { title: "Governance Excellence", desc: "Maintaining highest standards of ethics and compliance." },
        { title: "Human Capital", desc: "Attracting and retaining top global talent." },
        { title: "Operational Efficiency", desc: "Optimizing processes to maximize shareholder value." },
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
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#F1F5F9]"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="flex h-full">
                    <div className="w-1/3 bg-[#0A192F] p-16 flex flex-col justify-center text-white relative overflow-hidden">
                        <div className="absolute -right-20 -top-20 w-64 h-64 border-[20px] border-white/5 rounded-full"></div>
                        <h2 className="text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {data?.title}
                        </h2>
                        <div className="w-12 h-1 bg-[#C5A059] mb-6"></div>
                        <p className="text-gray-400 leading-relaxed font-light">
                            Our strategy is built on a foundation of robust governance and clear operational focus.
                        </p>
                    </div>

                    <div className="w-2/3 p-20 flex flex-col justify-center gap-8">
                        {(data?.pillars || []).map((pillar, idx) => (
                            <div key={idx} className="bg-white p-8 pl-10 shadow-md border-l-8 border-[#C5A059] flex items-center justify-between group hover:shadow-xl transition-shadow">
                                <div>
                                    <h3 className="text-2xl font-bold text-[#0A192F] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        {pillar.title}
                                    </h3>
                                    <p className="text-[#64748B] text-lg">{pillar.desc}</p>
                                </div>
                                <div className="text-6xl font-bold text-[#F1F5F9] group-hover:text-[#C5A059]/20 transition-colors">
                                    0{idx + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
