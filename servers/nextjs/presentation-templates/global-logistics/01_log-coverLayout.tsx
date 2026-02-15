import React from 'react'
import * as z from 'zod'


export const layoutId = "log-cover"
export const layoutName = "01. Logistics Cover"
export const layoutDescription = "Motion blur container ship."

export const Schema = z.object({
    year: z.string().default("2024"),
    company: z.string().default("TRANS_GLOBAL"),
    title: z.string().default("Sustainability Report"),
    tagline: z.string().default("Delivering a Greener Tomorrow."),

    bg_image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/2800100/pexels-photo-2800100.jpeg").meta({ description: "URL" }),
        __image_prompt__: z.string().default("container ship aerial view ocean blue").meta({ description: "Prompt" }),
    }).default({ __image_url__: "https://images.pexels.com/photos/2800100/pexels-photo-2800100.jpeg", __image_prompt__: "container ship aerial view ocean blue" }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Roboto+Mono:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0f172a] text-white"
                style={{
                    fontFamily: "'Roboto Mono', monospace",
                }}
            >
                <div className="absolute inset-0 z-0">
                    <img
                        src={data?.bg_image?.__image_url__}
                        className="w-full h-full object-cover mix-blend-overlay opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>
                </div>

                <div className="relative z-10 p-20 flex flex-col justify-center h-full">
                    <div className="w-20 h-2 bg-[#ea580c] mb-8"></div>

                    <h3 className="text-[#38bdf8] tracking-[0.5em] mb-4 text-sm font-bold uppercase">
                        {data?.company}
                    </h3>

                    <h1 className="text-9xl font-black mb-6 leading-[0.85] uppercase italic transform -skew-x-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {data?.year}<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Logistics</span><br />
                        Review
                    </h1>

                    <p className="text-2xl text-gray-300 font-light max-w-xl mt-8 border-l-4 border-[#ea580c] pl-6">
                        {data?.tagline}
                    </p>

                    {/* Decor Elements */}
                    <div className="absolute bottom-10 right-10 flex gap-4 text-xs text-gray-400 opacity-50">
                        <div>LON: 51.5072° N</div>
                        <div>NYC: 40.7128° N</div>
                        <div>SGP: 1.3521° N</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
