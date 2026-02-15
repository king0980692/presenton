import React from 'react'
import * as z from 'zod'


export const layoutId = "hosp-waste"
export const layoutName = "06. Food Waste"
export const layoutDescription = "Pie chart donut."

export const Schema = z.object({
    title: z.string().default("Conscious Kitchen"),

    reduction: z.string().default("25%"),
    desc: z.string().default("Reduction in food waste via AI-measured bins."),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#292524] text-[#e7e5e4] p-20 flex items-center justify-center"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="relative w-96 h-96 border-8 border-[#57534e] rounded-full flex items-center justify-center">
                    <div className="absolute inset-0 border-8 border-[#d97706] rounded-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0 75%)', transform: 'rotate(-45deg)' }}></div>

                    <div className="text-center">
                        <div className="text-8xl font-serif italic mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{data?.reduction}</div>
                        <div className="text-sm tracking-widest uppercase text-[#d97706]">Less Waste</div>
                    </div>
                </div>

                <div className="ml-20 max-w-sm">
                    <h2 className="text-5xl mb-8 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {data?.title}
                    </h2>
                    <p className="text-xl font-light text-gray-400">
                        {data?.desc}
                    </p>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
