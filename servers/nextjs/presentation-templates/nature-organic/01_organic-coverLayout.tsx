import React from 'react'
import * as z from 'zod'


export const layoutId = "organic-cover"
export const layoutName = "01. Organic Cover"
export const layoutDescription = "Soft, natural cover design with organic shapes."

export const Schema = z.object({
    year: z.string().min(4).max(10).default("2024").meta({
        description: "Report year.",
    }),

    title: z.string().min(5).max(50).default("Sustainability Report").meta({
        description: "Main title.",
    }),

    subtitle: z.string().min(10).max(100).default("Rooted in nature, growing for the future.").meta({
        description: "Subtitle or slogan.",
    }),

    background_image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg").meta({ description: "Background image URL" }),
        __image_prompt__: z.string().min(5).max(100).default("forest green leaves nature macro soft focus").meta({ description: "Image prompt" }),
    }).default({
        __image_url__: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg",
        __image_prompt__: "forest green leaves nature macro soft focus"
    }).meta({ description: "Cover background image" }),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#F3F4F1]" // Beige background
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                {/* Organic Shape Image Container */}
                <div
                    className="absolute top-0 right-0 w-[65%] h-full z-0 overflow-hidden"
                    style={{
                        borderBottomLeftRadius: '300px', // Organic curve
                        boxShadow: '-10px 10px 30px rgba(0,0,0,0.05)'
                    }}
                >
                    {data?.background_image?.__image_url__ && (
                        <img
                            src={data.background_image.__image_url__}
                            alt={data.background_image.__image_prompt__}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                {/* Content Container */}
                <div className="relative z-10 h-full flex flex-col justify-center px-16 w-[45%] text-[#2C3E50]">
                    <div className="mb-6">
                        <span className="inline-block px-4 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-sm font-semibold tracking-wide uppercase">
                            Annual Report
                        </span>
                    </div>

                    <h1 className="text-7xl font-light mb-2 text-[#1B5E20]" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.year || "2024"}
                    </h1>

                    <h2 className="text-4xl font-bold mb-6 leading-tight text-[#1B5E20]" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.title || "Sustainability Report"}
                    </h2>

                    <div className="w-16 h-1 bg-[#81C784] mb-6 rounded-full"></div>

                    <p className="text-xl leading-relaxed text-[#546E7A]">
                        {data?.subtitle || "Rooted in nature, growing for the future."}
                    </p>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
