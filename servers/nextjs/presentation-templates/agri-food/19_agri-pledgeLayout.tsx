import React from 'react'
import * as z from 'zod'


export const layoutId = "agri-pledge"
export const layoutName = "19. Our Pledge"
export const layoutDescription = "Handprint graphic."

export const Schema = z.object({
    title: z.string().default("2030 Pledge"),

    pledge: z.string().default("Net Zero. Nature Positive. Farmer First."),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,700;1,300&family=Open+Sans:wght@400;600&family=Caveat&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fffbeb] p-20 flex flex-col items-center justify-center text-center"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <div className="border-8 border-[#78350f] p-24 rounded-[40px] relative">
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#fffbeb] px-8">
                        <div className="text-8xl text-[#d97706] opacity-50">❝</div>
                    </div>

                    <h2 className="text-6xl text-[#78350f] font-bold mb-12" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.title}
                    </h2>

                    <p className="text-5xl text-[#92400e]" style={{ fontFamily: "'Caveat', cursive" }}>
                        {data?.pledge}
                    </p>

                    <div className="mt-16 flex justify-center gap-4">
                        <div className="w-32 h-1 bg-[#d6d3d1]"></div>
                        <div className="text-xs uppercase text-gray-400">Signed</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
