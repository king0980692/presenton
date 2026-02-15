import React from 'react'
import * as z from 'zod'


export const layoutId = "agri-future"
export const layoutName = "18. Future Protein"
export const layoutDescription = "Plant icon."

export const Schema = z.object({
    title: z.string().default("Plant-Based Future"),

    growth: z.string().default("300%"),
    desc: z.string().default("Growth in Alternative Protein R&D"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#064e3b] text-[#d1fae5] flex items-center justify-center p-20"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <div className="bg-[#059669] w-[500px] h-[500px] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 animate-pulse"></div>

                <div className="relative z-10 text-center">
                    <div className="text-9xl mb-8">🌱</div>
                    <h2 className="text-5xl font-bold mb-8" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.title}
                    </h2>

                    <div className="border-t border-b border-[#34d399] py-8">
                        <div className="text-8xl font-black text-[#34d399] mb-2">{data?.growth}</div>
                        <div className="uppercase tracking-widest text-[#a7f3d0]">{data?.desc}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
