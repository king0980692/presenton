import React from 'react'
import * as z from 'zod'


export const layoutId = "corp-toc"
export const layoutName = "02. Corporate Table of Contents"
export const layoutDescription = "Split layout TOC with elegant typography."

export const Schema = z.object({
    heading: z.string().default("Table of Contents"),

    chapters: z.array(z.object({
        num: z.string().default("01"),
        title: z.string().default("Section Title"),
        desc: z.string().default("Brief description of section contents."),
    })).min(4).max(5).default([
        { num: "01", title: "Executive Summary", desc: "A high-level overview of our annual performance." },
        { num: "02", title: "Business Strategy", desc: "Detailed roadmap for the upcoming fiscal year." },
        { num: "03", title: "Financial Review", desc: "Audited financial statements and analysis." },
        { num: "04", title: "Sustainability", desc: "ESG initiatives and community impact report." },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#F8F9FA]"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="flex h-full">
                    {/* Left Decor Bar */}
                    <div className="w-[15%] bg-[#0A192F] h-full flex flex-col justify-between py-12 items-center text-white/50">
                        <div className="h-full border-l border-white/20"></div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-20 pl-10">
                        <h2 className="text-5xl font-bold text-[#0A192F] mb-16 relative inline-block" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {data?.heading || "Table of Contents"}
                            <div className="absolute -bottom-4 left-0 w-full h-1 bg-[#C5A059]"></div>
                        </h2>

                        <div className="grid grid-cols-2 gap-x-16 gap-y-12">
                            {(data?.chapters || []).map((chapter, idx) => (
                                <div key={idx} className="flex gap-6 group">
                                    <div className="text-4xl font-bold text-[#C5A059] group-hover:text-[#0A192F] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        {chapter.num}.
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-[#0A192F] mb-2 group-hover:text-[#C5A059] transition-colors">
                                            {chapter.title}
                                        </h3>
                                        <p className="text-[#64748B] leading-relaxed text-sm">
                                            {chapter.desc}
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
