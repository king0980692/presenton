import React from 'react'
import * as z from 'zod'


export const layoutId = "vibrant-story"
export const layoutName = "06. Vibrant Our Story"
export const layoutDescription = "Text heavy layout with brutalist elements."

export const Schema = z.object({
    heading: z.string().default("HOW IT STARTED"),

    paragraph1: z.string().max(400).default("It began in a garage with nothing but a laptop and a dream. We wanted to disrupt the industry..."),
    paragraph2: z.string().max(400).default("Fast forward to today, we are a global movement. But we never lost that punk spirit."),

    tag: z.string().default("EST. 2020"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#E17055]" // Burnt Orange
                style={{
                    fontFamily: "'Poppins', sans-serif",
                }}
            >
                <div className="flex h-full">
                    <div className="w-[15%] bg-black h-full flex flex-col items-center py-10">
                        <div className="text-white text-4xl font-black writing-mode-vertical rotate-180 transform tracking-widest" style={{ writingMode: 'vertical-rl' }}>
                            ORIGIN STORY
                        </div>
                    </div>

                    <div className="flex-1 p-20 flex flex-col justify-center">
                        <div className="bg-white border-4 border-black p-10 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] max-w-3xl transform rotate-1">
                            <div className="flex justify-between items-start mb-6 border-b-4 border-black pb-4">
                                <h2 className="text-5xl font-black text-black">
                                    {data?.heading}
                                </h2>
                                <span className="bg-[#6C5CE7] text-white px-3 py-1 font-bold border-2 border-black transform rotate-6">
                                    {data?.tag}
                                </span>
                            </div>

                            <div className="space-y-6 text-xl font-medium leading-relaxed">
                                <p>{data?.paragraph1}</p>
                                <p className="text-[#E17055] font-bold">{data?.paragraph2}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
