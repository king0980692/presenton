import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-cover"
export const layoutName = "01. Tech Report Cover"
export const layoutDescription = "Dark mode digital cover."

export const Schema = z.object({
    year: z.string().default("2024"),
    company: z.string().default("NEURAL_CORE"),
    title: z.string().default("Impact Report"),
    subtitle: z.string().default("Decoding a Sustainable Future."),

    bg_image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg").meta({ description: "URL" }),
        __image_prompt__: z.string().default("abstract digital network grid dark blue neon").meta({ description: "Prompt" }),
    }).default({ __image_url__: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg", __image_prompt__: "abstract digital network grid dark blue neon" }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Inter:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0f172a] text-white"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <img
                    src={data?.bg_image?.__image_url__}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>

                <div className="relative z-10 p-20 h-full flex flex-col justify-center">
                    <div className="font-mono text-[#38bdf8] mb-6 tracking-widest text-sm">
                        &lt; {data?.company} /&gt;
                    </div>

                    <h1 className="text-8xl font-bold mb-4 leading-none tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {data?.year}<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#a855f7]">
                            {data?.title}
                        </span>
                    </h1>

                    <div className="w-24 h-1 bg-[#38bdf8] mb-8"></div>

                    <p className="text-2xl text-gray-400 font-light max-w-xl">
                        {data?.subtitle}
                    </p>
                </div>

                {/* Decor */}
                <div className="absolute bottom-20 right-20 font-mono text-xs text-gray-600">
                    v.2.0.4<br />
                    BUILD: {new Date().getFullYear()}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
