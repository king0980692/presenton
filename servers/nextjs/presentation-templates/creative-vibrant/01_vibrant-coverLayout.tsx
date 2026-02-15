import React from 'react'
import * as z from 'zod'


export const layoutId = "vibrant-cover"
export const layoutName = "01. Vibrant Cover"
export const layoutDescription = "Bold typographic cover with collage elements."

export const Schema = z.object({
    year: z.string().default("2024"),
    title: z.string().default("IMPACT REPORT"),
    subtitle: z.string().default("Unleashing Creativity for Good."),

    hero_image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg").meta({ description: "URL" }),
        __image_prompt__: z.string().default("diverse group of people laughing colorful").meta({ description: "Prompt" }),
    }).default({ __image_url__: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg", __image_prompt__: "diverse group of people laughing colorful" }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&family=Permanent+Marker&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#FFD700]" // Yellow background
                style={{
                    fontFamily: "'Poppins', sans-serif",
                }}
            >
                {/* Abstract Shapes */}
                <div className="absolute top-0 right-0 w-[60%] h-full bg-[#FF6B6B] transform skew-x-[-15deg] origin-top-right"></div>
                <div className="absolute bottom-0 left-0 w-[40%] h-[50%] bg-[#6C5CE7] rounded-tr-[100px]"></div>

                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="relative w-[80%] h-[70%] bg-white border-4 border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] flex">
                        {/* Image Side */}
                        <div className="w-[55%] h-full relative overflow-hidden border-r-4 border-black">
                            {data?.hero_image?.__image_url__ && (
                                <img
                                    src={data.hero_image.__image_url__}
                                    alt={data.hero_image.__image_prompt__}
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            )}
                            <div className="absolute top-4 left-4 bg-[#FF6B6B] text-white px-4 py-1 font-bold transform -rotate-3 border-2 border-black">
                                #CHANGE
                            </div>
                        </div>

                        {/* Text Side */}
                        <div className="w-[45%] p-10 flex flex-col justify-center relative">
                            <div className="absolute -top-6 -right-6 bg-[#6C5CE7] text-white w-24 h-24 rounded-full flex items-center justify-center font-black text-xl border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] animate-bounce">
                                {data?.year}
                            </div>

                            <h1 className="text-6xl font-black text-black leading-none mb-4 uppercase tracking-tighter">
                                {data?.title}
                            </h1>

                            <p className="text-xl font-bold text-[#FF6B6B]" style={{ fontFamily: "'Permanent Marker', cursive" }}>
                                {data?.subtitle}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
