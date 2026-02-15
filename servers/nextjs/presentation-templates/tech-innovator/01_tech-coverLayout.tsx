import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-cover"
export const layoutName = "01. Tech Cover"
export const layoutDescription = "Futuristic cover with grid lines."

export const Schema = z.object({
    report_title: z.string().min(5).max(50).default("SYSTEM_REPORT_2024").meta({
        description: "Main title.",
    }),

    version: z.string().default("v4.2.0").meta({
        description: "Version number or subtitle.",
    }),

    tagline: z.string().default("Data-Driven Sustainability // Future Ready").meta({
        description: "Tagline.",
    }),

    bg_image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg").meta({ description: "URL" }),
        __image_prompt__: z.string().default("abstract technology blue neon grid cpu").meta({ description: "Prompt" }),
    }).default({ __image_url__: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg", __image_prompt__: "abstract technology blue neon grid cpu" }).meta({ description: "Tech background" }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0B0F19] text-white"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                {/* Background Overlay */}
                <div className="absolute inset-0 z-0 opacity-40">
                    {data?.bg_image?.__image_url__ && (
                        <img
                            src={data.bg_image.__image_url__}
                            alt={data.bg_image.__image_prompt__}
                            className="w-full h-full object-cover mix-blend-luminosity"
                        />
                    )}
                </div>

                {/* Grid Overlay */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                ></div>

                {/* Content */}
                <div className="relative z-20 h-full flex flex-col justify-center px-20">
                    <div className="border-l-4 border-[#00E5FF] pl-8 py-4 bg-black/50 backdrop-blur-md max-w-4xl">
                        <div className="text-[#00E5FF] font-mono text-xl mb-2 tracking-widest">
                            &lt;{data?.version || "v4.2.0"} /&gt;
                        </div>

                        <h1 className="text-7xl font-bold mb-6 tracking-tight leading-none" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                            {data?.report_title || "SYSTEM_REPORT_2024"}
                        </h1>

                        <div className="flex items-center gap-4">
                            <span className="w-4 h-4 bg-[#00E5FF] animate-pulse"></span>
                            <p className="text-2xl font-light text-gray-300">
                                {data?.tagline || "Data-Driven Sustainability // Future Ready"}
                            </p>
                        </div>
                    </div>

                    {/* Decorative Tech Elements */}
                    <div className="absolute top-10 right-10 text-[#00E5FF] font-mono text-xs opacity-60">
                        STATUS: ONLINE<br />
                        SECURE_CONNECTION: TRUE<br />
                        LATENCY: 12ms
                    </div>

                    <div className="absolute bottom-10 left-20 right-20 h-px bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-50"></div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
