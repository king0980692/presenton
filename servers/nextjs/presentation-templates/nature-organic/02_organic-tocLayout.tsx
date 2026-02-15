import React from 'react'
import * as z from 'zod'


export const layoutId = "organic-toc"
export const layoutName = "02. Organic TOC"
export const layoutDescription = "Table of contents with leaf-like markers."

export const Schema = z.object({
    toc_title: z.string().min(5).max(30).default("Contents").meta({
        description: "TOC Heading.",
    }),

    chapters: z.array(z.object({
        number: z.string().default("01"),
        title: z.string().min(3).max(50).default("Chapter Title"),
        page: z.string().default("3"),
    })).min(3).max(6).default([
        { number: "01", title: "Overview", page: "3" },
        { number: "02", title: "Environmental Stewardship", page: "8" },
        { number: "03", title: "Social Impact", page: "15" },
        { number: "04", title: "Corporate Governance", page: "22" },
        { number: "05", title: "Data & Metrics", page: "30" },
    ]).meta({
        description: "Chapters list",
    }),

    side_image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/305821/pexels-photo-305821.jpeg").meta({ description: "Side image URL" }),
        __image_prompt__: z.string().min(5).max(50).default("green plant aesthetic minimalist").meta({ description: "Side image prompt" }),
    }).default({
        __image_url__: "https://images.pexels.com/photos/305821/pexels-photo-305821.jpeg",
        __image_prompt__: "green plant aesthetic minimalist"
    }).meta({ description: "Right side decorative image" }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Open+Sans:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#FDFBF7]"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <div className="grid grid-cols-2 h-full">
                    {/* Left Content */}
                    <div className="p-16 flex flex-col justify-center">
                        <h2 className="text-5xl font-bold mb-12 text-[#1B5E20]" style={{ fontFamily: "'Merriweather', serif" }}>
                            {data?.toc_title || "Contents"}
                        </h2>

                        <div className="space-y-6">
                            {(data?.chapters || []).map((chapter, idx) => (
                                <div key={idx} className="flex items-center group cursor-default">
                                    <div className="w-10 h-10 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center font-bold mr-6 group-hover:bg-[#C8E6C9] transition-colors">
                                        {chapter.number}
                                    </div>
                                    <div className="flex-1 border-b border-[#E0E0E0] pb-2 flex justify-between items-baseline">
                                        <span className="text-xl font-medium text-[#37474F] group-hover:text-[#1B5E20] transition-colors">
                                            {chapter.title}
                                        </span>
                                        <span className="text-sm text-[#90A4AE] font-semibold">
                                            pg. {chapter.page}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative h-full p-8">
                        <div className="w-full h-full rounded-[40px] overflow-hidden relative shadow-lg">
                            {data?.side_image?.__image_url__ && (
                                <img
                                    src={data.side_image.__image_url__}
                                    alt={data.side_image.__image_prompt__}
                                    className="w-full h-full object-cover"
                                />
                            )}
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1B5E20]/40 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
