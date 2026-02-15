import React from 'react'
import * as z from 'zod'


export const layoutId = "mfg-cover"
export const layoutName = "01. Industrial Cover"
export const layoutDescription = "Heavy industry cover with safety yellow accents."

export const Schema = z.object({
    year: z.string().default("2024"),
    company: z.string().default("APEX Heavy Industries"),
    title: z.string().default("Operational Excellence Report"),
    subtitle: z.string().default("Engineering a Sustainable Future."),

    bg_image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg").meta({ description: "URL" }),
        __image_prompt__: z.string().default("industrial factory floor machinery").meta({ description: "Prompt" }),
    }).default({ __image_url__: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg", __image_prompt__: "industrial factory floor machinery" }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto+Condensed:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#1A1A1A] text-white"
                style={{
                    fontFamily: "'Roboto Condensed', sans-serif",
                }}
            >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0 opacity-60">
                    {data?.bg_image?.__image_url__ && (
                        <img
                            src={data.bg_image.__image_url__}
                            alt={data.bg_image.__image_prompt__}
                            className="w-full h-full object-cover grayscale"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent"></div>
                </div>

                {/* Content Box */}
                <div className="relative z-10 h-full flex flex-col justify-center px-24">
                    <div className="border-l-[12px] border-[#FFD700] pl-10 py-2">
                        <div className="text-[#FFD700] font-bold text-xl tracking-[0.2em] mb-4 font-mono">
                            ANNUAL REPORT // {data?.year}
                        </div>

                        <h1 className="text-7xl font-bold uppercase leading-none mb-6 tracking-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
                            {data?.company}<br />
                            <span className="text-[#A0A0A0]">{data?.title}</span>
                        </h1>

                        <p className="text-2xl text-gray-300 max-w-2xl font-light border-t border-gray-600 pt-6">
                            {data?.subtitle}
                        </p>
                    </div>

                    {/* Bottom Warning Strip */}
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-black flex items-center px-24 border-t border-[#FFD700]">
                        <div className="flex gap-8 text-xs text-[#FFD700] font-mono">
                            <span>safe_days: 1,240</span>
                            <span>status: OPERATIONAL</span>
                            <span>iso_certified: 9001/14001</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
