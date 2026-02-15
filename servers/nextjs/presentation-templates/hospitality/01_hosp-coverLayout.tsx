import React from 'react'
import * as z from 'zod'


export const layoutId = "hosp-cover"
export const layoutName = "01. Hospitality Cover"
export const layoutDescription = "Full bleed luxury photo."

export const Schema = z.object({
    year: z.string().default("2024"),
    company: z.string().default("SERENITY DOJO"),
    title: z.string().default("Conscious Travel Report"),
    subtitle: z.string().default("Harmony with Nature, Connection with Culture."),

    bg_image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg").meta({ description: "URL" }),
        __image_prompt__: z.string().default("luxury eco resort infinity pool sunset").meta({ description: "Prompt" }),
    }).default({ __image_url__: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg", __image_prompt__: "luxury eco resort infinity pool sunset" }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#f5f5dc]"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <img
                    src={data?.bg_image?.__image_url__}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                <div className="relative z-10 w-full h-full flex flex-col justify-end items-center text-center pb-20 text-white">
                    <div className="text-sm tracking-[0.3em] uppercase mb-6 font-light">
                        {data?.company}
                    </div>

                    <h1 className="text-7xl mb-6 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {data?.title}
                    </h1>

                    <div className="w-px h-16 bg-white/50 mb-6"></div>

                    <p className="text-xl font-light tracking-wide italic opacity-90 max-w-2xl">
                        {data?.subtitle}
                    </p>

                    <div className="absolute bottom-10 right-10 text-xs tracking-widest uppercase opacity-70">
                        {data?.year} Annual Review
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
