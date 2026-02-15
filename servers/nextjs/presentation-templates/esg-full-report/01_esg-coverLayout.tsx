import React from 'react'
import * as z from 'zod'


export const layoutId = "esg-cover"
export const layoutName = "01. ESG Global Cover"
export const layoutDescription = "Standard ESG report cover with blue theme."

export const Schema = z.object({
    report_year: z.string().default("2024"),
    title: z.string().default("Sustainability Report"),
    subtitle: z.string().default("Commitment to a Better Future"),
    frameworks: z.string().default("GRI Standards / SASB / TCFD"),

    bg_image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg").meta({ description: "URL" }),
        __image_prompt__: z.string().default("aerial view of green city architecture").meta({ description: "Prompt" }),
    }).default({ __image_url__: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg", __image_prompt__: "aerial view of green city architecture" }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&family=Open+Sans:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                {/* Top Image Section */}
                <div className="h-[65%] relative overflow-hidden">
                    {data?.bg_image?.__image_url__ && (
                        <img
                            src={data.bg_image.__image_url__}
                            alt={data.bg_image.__image_prompt__}
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0052CC]/90 to-transparent mix-blend-multiply"></div>

                    {/* Year Overlay */}
                    <div className="absolute bottom-0 right-20 text-[120px] font-bold text-white/20 leading-none -mb-6">
                        {data?.report_year}
                    </div>
                </div>

                {/* Bottom Content Section */}
                <div className="h-[35%] bg-[#F4F5F7] px-20 flex flex-col justify-center relative border-t-8 border-[#0052CC]">
                    <h1 className="text-5xl font-bold text-[#172B4D] mb-2">{data?.title}</h1>
                    <p className="text-2xl text-[#5E6C84] mb-4 font-light">{data?.subtitle}</p>

                    <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs font-bold text-[#0052CC] uppercase tracking-wider border border-[#0052CC] px-2 py-1 rounded">
                            Based on
                        </span>
                        <span className="text-sm text-[#42526E] font-semibold">
                            {data?.frameworks}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
