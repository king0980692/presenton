import React from 'react'
import * as z from 'zod'


export const layoutId = "minimal-toc"
export const layoutName = "2. Table of Contents"
export const layoutDescription = "Clean, numbered list for report sections."

export const Schema = z.object({
    title: z.string().min(5).max(40).default("Table of Contents").meta({
        description: "Main heading text.",
    }),

    chapters: z.array(z.object({
        number: z.string().default("01").meta({ description: "Chapter number" }),
        title: z.string().min(3).max(50).default("Chapter Title").meta({ description: "Chapter title" }),
        description: z.string().min(5).max(100).default("Brief description of the chapter content.").meta({ description: "Chapter description" }),
    })).min(1).max(5).default([
        { number: "01", title: "Executive Summary", description: "Message from our CEO and 2024 overview." },
        { number: "02", title: "Environmental Impact", description: "Carbon footprint reduction and energy efficiency." },
        { number: "03", title: "Social Responsibility", description: "Community engagement and employee welfare." },
        { number: "04", title: "Governance", description: "Ethical standards and board structure." },
        { number: "05", title: "Future Outlook", description: "Goals and roadmap for 2025 and beyond." }
    ]).meta({
        description: "List of chapters",
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    fontFamily: "var(--heading-font-family, Inter)",
                    backgroundColor: 'var(--card-background-color, #FFFFFF)',
                }}
            >
                <div className="grid h-full" style={{ gridTemplateColumns: '30% 70%' }}>
                    {/* Left Column: Title */}
                    <div className="flex flex-col p-12 justify-center" style={{ backgroundColor: 'var(--secondary-accent-color, #F9FAFB)' }}>
                        <h1 className="text-5xl font-bold leading-tight" style={{ color: 'var(--text-heading-color, #111827)' }}>
                            {data?.title || "Table of Contents"}
                        </h1>
                        <div className="mt-6 w-16 h-1 bg-black"></div>
                    </div>

                    {/* Right Column: List */}
                    <div className="flex flex-col p-12 justify-center">
                        <div className="space-y-8">
                            {(data?.chapters || []).map((item, idx) => (
                                <div key={idx} className="flex items-start gap-6 group">
                                    <div className="text-xl font-bold opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--primary-accent-color, #000000)' }}>
                                        {item.number}
                                    </div>
                                    <div className="flex-1 border-b border-gray-100 pb-4">
                                        <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-heading-color, #111827)' }}>
                                            {item.title}
                                        </h3>
                                        <p className="text-base" style={{ color: 'var(--text-body-color, #6B7280)' }}>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
