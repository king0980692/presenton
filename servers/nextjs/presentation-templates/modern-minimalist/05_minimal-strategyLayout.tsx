import React from 'react'
import * as z from 'zod'


export const layoutId = "minimal-strategy"
export const layoutName = "4. ESG Strategy"
export const layoutDescription = "Three column layout for strategy pillars."

export const Schema = z.object({
    strategy_title: z.string().min(5).max(60).default("Our ESG Strategy").meta({
        description: "Main heading text.",
    }),

    pillars: z.array(z.object({
        title: z.string().min(3).max(30).default("Pillar").meta({ description: "Pillar title" }),
        description: z.string().min(10).max(200).default("Description of this strategic pillar.").meta({ description: "Pillar description" }),
    })).min(3).max(3).default([
        { title: "Environmental", description: "Committed to net-zero emissions by 2050 through renewable energy adoption and waste reduction initiatives." },
        { title: "Social", description: "Fostering inclusive growth, ensuring fair labor practices, and supporting community development programs." },
        { title: "Governance", description: "Upholding the highest standards of ethics, transparency, and accountability in all our operations." },
    ]).meta({
        description: "List of 3 strategy pillars",
    }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex flex-col"
                style={{
                    fontFamily: "var(--heading-font-family, Inter)",
                    backgroundColor: 'var(--card-background-color, #FFFFFF)',
                }}
            >
                <div className="p-12 pb-0">
                    <h2 className="text-4xl font-bold" style={{ color: 'var(--text-heading-color, #111827)' }}>
                        {data?.strategy_title || "Our ESG Strategy"}
                    </h2>
                    <div className="w-24 h-1 bg-black mt-6"></div>
                </div>

                <div className="flex-1 p-12 grid grid-cols-3 gap-12 items-center">
                    {(data?.pillars || []).map((pillar, idx) => (
                        <div key={idx} className="flex flex-col h-full bg-gray-50 p-8 rounded-sm border-l-4 border-black hover:bg-gray-100 transition-colors">
                            <div className="text-6xl font-bold text-gray-200 mb-4 select-none">0{idx + 1}</div>
                            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-heading-color, #111827)' }}>{pillar.title}</h3>
                            <p className="text-lg leading-relaxed flex-1" style={{ color: 'var(--text-body-color, #4B5563)' }}>
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
