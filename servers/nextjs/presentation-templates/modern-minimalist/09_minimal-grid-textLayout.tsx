import React from 'react'
import * as z from 'zod'


export const layoutId = "minimal-grid-text"
export const layoutName = "8. Key Initiatives"
export const layoutDescription = "Grid layout for text-heavy content."

export const Schema = z.object({
    page_heading: z.string().min(5).max(50).default("Key Initiatives 2024").meta({
        description: "Page heading.",
    }),

    initiatives: z.array(z.object({
        title: z.string().min(5).max(40).default("Initiative Title").meta({ description: "Initiative title" }),
        content: z.string().min(20).max(300).default("Detailed description of this initiative. Explain the goals, actions taken, and the results achieved.").meta({ description: "Initiative description" }),
    })).min(2).max(4).default([
        { title: "Supply Chain Optimization", content: "Working closely with suppliers to reduce carbon footprint in logistics and ensuring ethical sourcing of raw materials." },
        { title: "Waste Reduction Program", content: "Implemented a zero-waste policy in all corporate offices, achieving a 90% diversion rate from landfills." },
        { title: "Community Outreach", content: "Partnered with local NGOs to support education and environmental awareness programs in underserved communities." },
        { title: "Green Energy Transition", content: "Transitioned 80% of our global operations to renewable energy sources, aiming for 100% by 2025." },
    ]).meta({
        description: "List of key initiatives",
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
                    <h2 className="text-3xl font-bold uppercase tracking-wider text-gray-400">
                        Projects
                    </h2>
                    <h1 className="text-5xl font-bold mt-2" style={{ color: 'var(--text-heading-color, #111827)' }}>
                        {data?.page_heading || "Key Initiatives 2024"}
                    </h1>
                    <div className="w-full h-px bg-gray-200 mt-8"></div>
                </div>

                <div className="flex-1 p-12 grid grid-cols-2 gap-12 overflow-y-auto">
                    {(data?.initiatives || []).map((item, idx) => (
                        <div key={idx} className="flex flex-col">
                            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-heading-color, #111827)' }}>{item.title}</h3>
                            <p className="text-lg leading-relaxed text-gray-600">
                                {item.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
