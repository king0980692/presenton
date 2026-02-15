import React from 'react'
import * as z from 'zod'


export const layoutId = "fin-cover"
export const layoutName = "01. Annual Report Cover"
export const layoutDescription = "Elegant serif cover with deep green."

export const Schema = z.object({
    year: z.string().default("2024"),
    company: z.string().default("ROYAL TRUST BANK"),
    title: z.string().default("Integrated Annual Report"),
    theme: z.string().default("Resilience & Responsible Growth"),

    bg_image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg").meta({ description: "URL" }),
        __image_prompt__: z.string().default("modern office skyscraper architecture").meta({ description: "Prompt" }),
    }).default({ __image_url__: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg", __image_prompt__: "modern office skyscraper architecture" }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#064e3b] text-white"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <div className="flex h-full">
                    {/* Left Text */}
                    <div className="w-[40%] bg-[#064e3b] p-16 flex flex-col justify-between border-r border-[#ffffff33]">
                        <div className="text-[#d4af37] font-bold tracking-[0.3em] text-sm uppercase">
                            {data?.company}
                        </div>

                        <div>
                            <h1 className="text-6xl font-serif italic mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {data?.year}
                            </h1>
                            <h2 className="text-4xl font-light mb-8 opacity-90 leading-tight">
                                {data?.title}
                            </h2>
                            <div className="w-20 h-1 bg-[#d4af37] mb-8"></div>
                            <p className="text-xl font-light text-gray-300 italic">
                                "{data?.theme}"
                            </p>
                        </div>

                        <div className="text-xs text-gray-400 uppercase tracking-widest">
                            Stock Code: RTB | NYSE
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="w-[60%] relative">
                        {data?.bg_image?.__image_url__ && (
                            <img
                                src={data.bg_image.__image_url__}
                                className="w-full h-full object-cover grayscale opacity-80 mix-blend-overlay"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b] to-transparent opacity-80"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
