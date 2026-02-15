import React from 'react'
import * as z from 'zod'


export const layoutId = "hosp-water"
export const layoutName = "09. Water Saving"
export const layoutDescription = "Water infographic."

export const Schema = z.object({
    title: z.string().default("Preserving Our Waters"),

    saved: z.string().default("1.5M Liters"),
    label: z.string().default("Saved annually via greywater recycling."),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-gradient-to-b from-[#f0f9ff] to-[#bae6fd] p-20 flex flex-col items-center justify-center text-center"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <h2 className="text-5xl text-[#0369a1] mb-12 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {data?.title}
                </h2>

                <div className="relative">
                    <div className="text-[200px] leading-none text-[#0ea5e9]/20 font-serif absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        💧
                    </div>
                    <div className="relative z-10">
                        <div className="text-8xl font-light text-[#0c4a6e] mb-4">{data?.saved}</div>
                        <div className="text-xl text-[#075985] max-w-md mx-auto">{data?.label}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
