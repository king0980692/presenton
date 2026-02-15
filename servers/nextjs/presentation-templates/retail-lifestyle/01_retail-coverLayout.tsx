import React from 'react'
import * as z from 'zod'


export const layoutId = "retail-cover"
export const layoutName = "01. Lifestyle Cover"
export const layoutDescription = "Split image with bold typography."

export const Schema = z.object({
    year: z.string().default("2024"),
    brand: z.string().default("URBAN thread."),
    title: z.string().default("Conscious Living Report"),
    tagline: z.string().default("Style that sustains."),

    bg_image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg").meta({ description: "URL" }),
        __image_prompt__: z.string().default("diverse group of friends wearing sustainable fashion").meta({ description: "Prompt" }),
    }).default({ __image_url__: "https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg", __image_prompt__: "diverse group of friends wearing sustainable fashion" }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Mulish:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#e5e5e5]"
                style={{
                    fontFamily: "'Mulish', sans-serif",
                }}
            >
                <div className="flex h-full">
                    {/* Left Image Area */}
                    <div className="w-[60%] relative p-8">
                        <div className="w-full h-full rounded-[40px] overflow-hidden relative">
                            {data?.bg_image?.__image_url__ && (
                                <img
                                    src={data.bg_image.__image_url__}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        {/* Circular Badge */}
                        <div className="absolute top-16 right-16 w-32 h-32 bg-[#c2410c] rounded-full flex items-center justify-center text-[#fef3c7] font-bold text-center leading-tight rotate-12 shadow-lg z-10">
                            <span className="text-xl font-serif">{data?.year}<br />Impact<br />Review</span>
                        </div>
                    </div>

                    {/* Right Text Area */}
                    <div className="w-[40%] flex flex-col justify-center pr-16 pl-4">
                        <div className="text-lg font-bold tracking-widest uppercase mb-4 text-[#4338ca]">
                            {data?.brand}
                        </div>
                        <h1 className="text-7xl font-serif text-[#1c1917] leading-[0.9] mb-6 italic" style={{ fontFamily: "'DM Serif Display', serif" }}>
                            {data?.title}
                        </h1>
                        <p className="text-2xl text-[#57534e] font-light">
                            {data?.tagline}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
