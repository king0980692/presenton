import React from 'react'
import * as z from 'zod'


export const layoutId = "corp-project"
export const layoutName = "08. Corporate Project Spotlight"
export const layoutDescription = "Detailed project page with large image."

export const Schema = z.object({
    heading: z.string().default("Project: Clean Future"),
    description: z.string().max(400).default("Our Clean Future initiative focuses on transitioning 100% of our production facilities to renewable energy by 2030. This ambitious project involves solar panel installations, wind energy procurement, and efficiency upgrades."),

    image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg").meta({ description: "URL" }),
        __image_prompt__: z.string().default("wind turbines corporate").meta({ description: "Prompt" }),
    }).default({ __image_url__: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg", __image_prompt__: "wind turbines corporate" }),

    stat_highlight: z.string().default("30% Reduction in Emissions"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="flex h-full">
                    {/* Image Side */}
                    <div className="w-1/2 relative bg-gray-100">
                        {data?.image?.__image_url__ && (
                            <img
                                src={data.image.__image_url__}
                                alt={data.image.__image_prompt__}
                                className="w-full h-full object-cover"
                            />
                        )}
                        <div className="absolute inset-0 bg-[#0A192F]/20"></div>
                    </div>

                    {/* Content Side */}
                    <div className="w-1/2 p-20 flex flex-col justify-center">
                        <span className="text-[#C5A059] uppercase tracking-widest font-bold text-sm mb-4">Strategic Initiative</span>

                        <h2 className="text-4xl font-bold text-[#0A192F] mb-8 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {data?.heading}
                        </h2>

                        <p className="text-[#4A5568] leading-8 text-lg mb-10 font-light">
                            {data?.description}
                        </p>

                        <div className="bg-[#F1F5F9] p-6 border-l-4 border-[#0A192F]">
                            <span className="block text-sm text-[#64748B] uppercase mb-1">Impact</span>
                            <span className="text-2xl font-bold text-[#0A192F]">{data?.stat_highlight}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
