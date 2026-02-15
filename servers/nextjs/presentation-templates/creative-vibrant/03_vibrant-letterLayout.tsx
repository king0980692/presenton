import React from 'react'
import * as z from 'zod'


export const layoutId = "vibrant-letter"
export const layoutName = "03. Vibrant Founder Letter"
export const layoutDescription = "Zine style interview layout."

export const Schema = z.object({
    headline: z.string().default("WE ARE JUST GETTING STARTED"),

    quote: z.string().max(200).default("Creativity isn't just about art; it's about solving the world's toughest problems in new ways."),

    body: z.string().max(800).default("This year has been a rollercoaster of breakthroughs. We challenged the status quo, broke a few rules, and built something truly meaningful for our community..."),

    founder: z.string().default("Mia K."),

    image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg").meta({ description: "URL" }),
        __image_prompt__: z.string().default("cool creative person portrait colorful").meta({ description: "Prompt" }),
    }).default({ __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg", __image_prompt__: "cool creative person portrait colorful" }),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white"
                style={{
                    fontFamily: "'Poppins', sans-serif",
                }}
            >
                <div className="flex h-full">
                    {/* Left Image Side */}
                    <div className="w-[40%] bg-[#6C5CE7] p-8 flex items-center justify-center relative border-r-4 border-black">
                        <div className="relative w-full h-[80%] transform rotate-2">
                            <div className="absolute inset-0 bg-black translate-x-4 translate-y-4"></div>
                            <div className="absolute inset-0 bg-[#FFD700] border-4 border-black overflow-hidden">
                                {data?.image?.__image_url__ && (
                                    <img
                                        src={data.image.__image_url__}
                                        alt={data.image.__image_prompt__}
                                        className="w-full h-full object-cover mix-blend-multiply"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="absolute bottom-10 -right-10 bg-white border-4 border-black px-6 py-2 transform -rotate-6 z-10 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
                            <span className="font-bold text-xl">{data?.founder} presents:</span>
                        </div>
                    </div>

                    {/* Right Text Side */}
                    <div className="w-[60%] p-16 flex flex-col justify-center bg-[#F0F0F0]">
                        <h2 className="text-5xl font-black mb-8 leading-[0.9] text-black">
                            {data?.headline}
                        </h2>

                        <div className="bg-white p-8 border-4 border-black shadow-[10px_10px_0px_0px_#FF6B6B] mb-8 relative">
                            <div className="absolute -top-4 -left-4 text-6xl text-[#6C5CE7] opacity-50 font-serif">"</div>
                            <p className="font-bold text-xl italic">{data?.quote}</p>
                        </div>

                        <p className="text-lg leading-relaxed font-medium">
                            {data?.body}
                        </p>

                        <div className="mt-8 text-right">
                            <span className="text-2xl text-[#6C5CE7]" style={{ fontFamily: "'Permanent Marker', cursive" }}>xoxo {data?.founder}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
