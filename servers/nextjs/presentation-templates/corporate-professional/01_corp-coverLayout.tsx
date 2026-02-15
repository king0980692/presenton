import React from 'react'
import * as z from 'zod'


export const layoutId = "corp-cover"
export const layoutName = "01. Corporate Cover"
export const layoutDescription = "Professional cover with navy blue overlay."

export const Schema = z.object({
    year: z.string().min(4).max(10).default("2024").meta({
        description: "Year.",
    }),

    company: z.string().default("Global Enterprise Ltd.").meta({
        description: "Company name.",
    }),

    title: z.string().default("Annual Growth Report").meta({
        description: "Main title.",
    }),

    subtitle: z.string().default("Driving sustainable value through innovation and integrity.").meta({
        description: "Subtitle.",
    }),

    bg_image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg").meta({ description: "URL" }),
        __image_prompt__: z.string().default("modern corporate office skyscraper window").meta({ description: "Prompt" }),
    }).default({ __image_url__: "https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg", __image_prompt__: "modern corporate office skyscraper window" }),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0A192F]"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    {data?.bg_image?.__image_url__ && (
                        <img
                            src={data.bg_image.__image_url__}
                            alt={data.bg_image.__image_prompt__}
                            className="w-full h-full object-cover"
                        />
                    )}
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-[#0A192F]/80 mix-blend-multiply"></div>
                </div>

                {/* Content Box */}
                <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="bg-white/95 w-[80%] max-w-4xl p-16 shadow-2xl relative border-t-8 border-[#C5A059]">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#C5A059] text-white px-6 py-1 text-sm font-bold tracking-widest uppercase">
                            {data?.year || "2024"}
                        </div>

                        <div className="text-center">
                            <p className="text-[#8892B0] uppercase tracking-[0.2em] mb-4 text-sm font-bold">
                                {data?.company || "Global Enterprise Ltd."}
                            </p>

                            <h1 className="text-6xl font-bold text-[#0A192F] mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {data?.title || "Annual Growth Report"}
                            </h1>

                            <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-6"></div>

                            <p className="text-xl text-[#4A5568] max-w-2xl mx-auto font-light leading-relaxed">
                                {data?.subtitle || "Driving sustainable value through innovation and integrity."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
