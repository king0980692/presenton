import React from 'react'
import * as z from 'zod'


export const layoutId = "agri-packaging"
export const layoutName = "13. Compostable"
export const layoutDescription = "Package photo."

export const Schema = z.object({
    title: z.string().default("Return to Earth"),

    stat: z.string().default("100%"),
    label: z.string().default("Home Compostable Packaging by 2025"),

    img: z.string().url().default("https://images.pexels.com/photos/7262900/pexels-photo-7262900.jpeg"), // Eco packaging
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#78350f] text-[#ffedd5] flex"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <div className="w-1/3 bg-[#92400e] flex flex-col justify-center p-12 text-center">
                    <div className="text-[100px] leading-none mb-8 opacity-50">♻️</div>
                    <h2 className="text-4xl font-bold mb-8" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.title}
                    </h2>
                    <div className="text-6xl font-black mb-2">{data?.stat}</div>
                    <div className="uppercase font-bold opacity-80">{data?.label}</div>
                </div>

                <div className="w-2/3 relative">
                    <img src={data?.img} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#78350f] mix-blend-color opacity-30"></div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
