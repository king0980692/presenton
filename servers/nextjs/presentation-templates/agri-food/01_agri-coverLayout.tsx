import React from 'react'
import * as z from 'zod'


export const layoutId = "agri-cover"
export const layoutName = "01. Agri Cover"
export const layoutDescription = "Split screen soil and sky."

export const Schema = z.object({
    year: z.string().default("2024"),
    company: z.string().default("TERRA HARVEST"),
    title: z.string().default("Sustainability Report"),
    subtitle: z.string().default("Nourishing the World, Regenerating the Planet."),

    bg_image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg").meta({ description: "URL" }),
        __image_prompt__: z.string().default("wheat field golden hour close up hand touching crops").meta({ description: "Prompt" }),
    }).default({ __image_url__: "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg", __image_prompt__: "wheat field golden hour close up hand touching crops" }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,700;1,300&family=Open+Sans:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fefce8] flex flex-col"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <div className="h-[65%] relative overflow-hidden rounded-b-[80px]">
                    <img
                        src={data?.bg_image?.__image_url__}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                    <div className="absolute bottom-10 left-10 text-white">
                        <div className="text-xl tracking-[0.2em] uppercase font-bold text-[#fefce8] mb-2">{data?.company}</div>
                        <div className="text-6xl font-black text-[#fefce8] opacity-20">{data?.year}</div>
                    </div>
                </div>

                <div className="h-[35%] flex flex-col justify-center items-center text-center p-8 bg-[#fefce8] text-[#3f6212]">
                    <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.title}
                    </h1>
                    <p className="text-xl italic text-[#65a30d]">
                        {data?.subtitle}
                    </p>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
