import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-letter"
export const layoutName = "03. Tech CTO Letter"
export const layoutDescription = "Letter layout with code-block styling."

export const Schema = z.object({
    title: z.string().default("Transmission from CTO"),

    message: z.string().max(1000).default("Innovation is the core of our sustainability strategy. By leveraging AI and IoT, we are optimizing resource usage across our global infrastructure..."),

    sender: z.string().default("Dr. Alan Turing"),
    role: z.string().default("Chief Technology Officer"),

    photo: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg").meta({ description: "URL" }),
        __image_prompt__: z.string().default("tech leader futuristic portrait").meta({ description: "Prompt" }),
    }).default({ __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg", __image_prompt__: "tech leader futuristic portrait" }),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0B0F19] text-white flex p-16 gap-12"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                {/* Profile Section */}
                <div className="w-1/3 flex flex-col items-center">
                    <div className="w-full aspect-[3/4] bg-[#1E293B] relative border-2 border-[#00E5FF] p-2 mb-6">
                        <div className="w-full h-full bg-gray-800 overflow-hidden grayscale contrast-125">
                            {data?.photo?.__image_url__ && (
                                <img
                                    src={data.photo.__image_url__}
                                    alt={data.photo.__image_prompt__}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        {/* Tech Corners */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
                    </div>

                    <h3 className="text-2xl font-bold font-mono text-center">{data?.sender}</h3>
                    <p className="text-[#00E5FF] font-mono text-sm mt-2">{data?.role}</p>
                </div>

                {/* Message Section */}
                <div className="w-2/3 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold mb-8 font-mono border-b border-gray-700 pb-4">
                        &gt; {data?.title || "Transmission from CTO"}
                    </h2>

                    <div className="bg-[#1E293B]/50 p-8 rounded-lg border border-gray-700 font-mono text-gray-300 leading-relaxed relative">
                        <div className="absolute -top-3 left-4 bg-[#0B0F19] px-2 text-xs text-[#00E5FF]">message_body.txt</div>
                        <p>
                            {data?.message}
                        </p>
                        <div className="mt-6 flex justify-end">
                            <span className="w-3 h-6 bg-[#00E5FF] animate-pulse"></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
