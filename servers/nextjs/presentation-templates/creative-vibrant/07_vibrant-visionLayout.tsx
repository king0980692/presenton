import React from 'react'
import * as z from 'zod'


export const layoutId = "vibrant-vision"
export const layoutName = "07. Vibrant Vision"
export const layoutDescription = "Gradient background with big text."

export const Schema = z.object({
    vision_statement: z.string().default("TO INSPIRE THE NEXT GENERATION OF CREATORS"),
    sub_text: z.string().default("We believe in a world where everyone has the tools to build their dreams."),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-gradient-to-br from-[#6C5CE7] via-[#FF7675] to-[#FDCB6E]"
                style={{
                    fontFamily: "'Poppins', sans-serif",
                }}
            >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-20 text-center">
                    <h2 className="text-7xl font-black text-white leading-tight mb-8 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
                        {data?.vision_statement}
                    </h2>

                    <div className="bg-black text-white px-8 py-4 text-2xl font-bold transform -rotate-1 skew-x-12 inline-block border-2 border-white shadow-[10px_10px_0px_0px_#00B894]">
                        {data?.sub_text}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
