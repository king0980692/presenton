import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-photo-text"
export const layoutName = "08. Tech Deep Dive"
export const layoutDescription = "Split layout with code overlay."

export const Schema = z.object({
    heading: z.string().default("The_Singularity"),

    content: z.string().max(300).default("Our proprietary algorithms are capable of optimizing energy grids with 99.9% accuracy, reducing waste by terawatts annually."),

    image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/17483848/pexels-photo-17483848.jpeg").meta({ description: "URL" }),
        __image_prompt__: z.string().default("abstract digital tunnel").meta({ description: "Prompt" }),
    }).default({ __image_url__: "https://images.pexels.com/photos/17483848/pexels-photo-17483848.jpeg", __image_prompt__: "abstract digital tunnel" }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-black text-white"
                style={{
                    fontFamily: "'JetBrains Mono', monospace",
                }}
            >
                <div className="absolute inset-0 z-0">
                    {data?.image?.__image_url__ && (
                        <img
                            src={data.image.__image_url__}
                            alt={data.image.__image_prompt__}
                            className="w-full h-full object-cover opacity-60"
                        />
                    )}
                </div>

                {/* Floating Code Window */}
                <div className="absolute top-1/2 right-20 transform -translate-y-1/2 w-[500px] bg-black/80 backdrop-blur border border-gray-700 p-1 shadow-2xl skew-x-[-5deg]">
                    {/* Window Header */}
                    <div className="bg-[#1E293B] px-4 py-2 flex items-center justify-between text-xs text-gray-400 border-b border-gray-700">
                        <span>details.log</span>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                    </div>

                    <div className="p-8 skew-x-[5deg]">
                        <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-[#00E5FF] pl-4">
                            {data?.heading}
                        </h2>
                        <p className="text-gray-300 leading-loose border-t border-gray-800 pt-4">
                            <span className="text-[#00E5FF] mr-2">&gt;&gt;</span>
                            {data?.content}
                            <span className="animate-pulse">_</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
