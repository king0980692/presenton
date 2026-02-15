import React from 'react'
import * as z from 'zod'


export const layoutId = "re-cover"
export const layoutName = "01. Real Estate Cover"
export const layoutDescription = "Split screen architectural photo."

export const Schema = z.object({
    year: z.string().default("2024"),
    company: z.string().default("URBAN STRUCTURES"),
    title: z.string().default("Sustainability Report"),
    subtitle: z.string().default("Building Resilient Communities."),

    bg_image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg").meta({ description: "URL" }),
        __image_prompt__: z.string().default("modern skyscraper angle glass concrete").meta({ description: "Prompt" }),
    }).default({ __image_url__: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg", __image_prompt__: "modern skyscraper angle glass concrete" }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;500;700&family=Roboto:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white flex"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                {/* Left Side - Solid Color & Text */}
                <div className="w-[40%] bg-[#374151] text-white flex flex-col justify-center p-16 relative">
                    <div className="absolute top-10 left-10 w-20 h-20 border-t-4 border-l-4 border-[#10b981]"></div>

                    <h3 className="text-[#10b981] font-bold tracking-[0.2em] mb-4 text-sm font-sans uppercase">
                        {data?.company}
                    </h3>

                    <h1 className="text-7xl font-bold mb-6 leading-tight uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        {data?.year}<br />
                        <span className="font-light text-gray-400">Impact</span><br />
                        Report
                    </h1>

                    <div className="w-16 h-2 bg-[#10b981] mb-8"></div>

                    <p className="text-xl text-gray-300 font-light max-w-xs leading-relaxed">
                        {data?.subtitle}
                    </p>
                </div>

                {/* Right Side - Image */}
                <div className="w-[60%] relative">
                    <img
                        src={data?.bg_image?.__image_url__}
                        className="w-full h-full object-cover grayscale contrast-125"
                    />
                    <div className="absolute inset-0 bg-[#374151] mix-blend-multiply opacity-20"></div>

                    {/* Architectural grid lines */}
                    <div className="absolute inset-0 border-[20px] border-white/0 pointer-events-none">
                        <div className="absolute top-10 right-10 w-40 h-40 border border-white/30"></div>
                        <div className="absolute bottom-10 right-10 w-20 h-20 border border-white/30"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
