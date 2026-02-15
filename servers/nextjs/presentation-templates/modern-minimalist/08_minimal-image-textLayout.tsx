import React from 'react'
import * as z from 'zod'


export const layoutId = "minimal-image-text"
export const layoutName = "7. Full Image with Text"
export const layoutDescription = "Impactful full-screen image with overlay text."

export const Schema = z.object({
    bg_image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg").meta({ description: "Background URL" }),
        __image_prompt__: z.string().min(5).max(50).default("nature landscape wide angle").meta({ description: "Image prompt" }),
    }).default({
        __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
        __image_prompt__: "nature landscape wide angle"
    }).meta({ description: "Background image" }),

    heading: z.string().min(5).max(50).default("Building a Greener Future").meta({
        description: "Overlay heading.",
    }),

    text_content: z.string().min(10).max(250).default("We are dedicated to sustainable practices that protect our planet for future generations. Join us on this journey.").meta({
        description: "Overlay description text.",
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden text-white"
                style={{
                    fontFamily: "var(--heading-font-family, Inter)",
                    backgroundColor: '#000000',
                }}
            >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    {data?.bg_image?.__image_url__ && (
                        <img
                            src={data.bg_image.__image_url__}
                            alt={data.bg_image.__image_prompt__}
                            className="w-full h-full object-cover opacity-70"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 w-full h-full flex flex-col justify-end p-16 pb-20">
                    <h2 className="text-5xl font-bold mb-6 max-w-3xl leading-tight">
                        {data?.heading || "Building a Greener Future"}
                    </h2>
                    <div className="w-24 h-1 bg-white mb-6"></div>
                    <p className="text-xl max-w-2xl leading-relaxed font-light opacity-90">
                        {data?.text_content || "We are dedicated to sustainable practices that protect our planet for future generations. Join us on this journey."}
                    </p>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
