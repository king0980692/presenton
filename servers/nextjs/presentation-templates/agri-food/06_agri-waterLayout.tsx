import React from 'react'
import * as z from 'zod'


export const layoutId = "agri-water"
export const layoutName = "06. Precision Water"
export const layoutDescription = "Drop graphic."

export const Schema = z.object({
    title: z.string().default("More Crop Per Drop"),

    reduction: z.string().default("-30%"),
    desc: z.string().default("Water usage reduction via smart drip irrigation systems."),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,700;1,300&family=Open+Sans:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#f0f9ff] flex items-center justify-center p-20"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                {/* Large Water Drop Shape Background */}
                <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-[#bae6fd] rounded-full rounded-tl-none transform -translate-x-1/2 -translate-y-[45%] rotate-45 opacity-50"></div>

                <div className="relative z-10 text-center">
                    <h2 className="text-5xl text-[#0369a1] mb-12 font-bold" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.title}
                    </h2>

                    <div className="text-9xl font-black text-[#0ea5e9] mb-4 drop-shadow-lg">{data?.reduction}</div>
                    <div className="text-xl text-[#0c4a6e] bg-white/70 px-8 py-4 rounded-full shadow-sm max-w-lg mx-auto">
                        {data?.desc}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
