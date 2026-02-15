import React from 'react'
import * as z from 'zod'


export const layoutId = "hosp-wages"
export const layoutName = "12. Fair Employment"
export const layoutDescription = "Quote card."

export const Schema = z.object({
    title: z.string().default("Fair Wages"),

    stat: z.string().default("100%"),
    label: z.string().default("Living Wage Certified"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fffbeb] p-20 flex flex-col items-center justify-center text-center"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="border-4 border-[#b45309] p-24 relative max-w-3xl">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#fffbeb] px-8 text-[#b45309] font-serif italic text-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Our Promise
                    </div>

                    <div className="text-8xl font-bold text-[#78350f] mb-6">{data?.stat}</div>

                    <h2 className="text-4xl text-[#92400e] mb-8 font-light uppercase tracking-widest">
                        {data?.label}
                    </h2>

                    <p className="text-[#b45309] italic opacity-80 max-w-lg mx-auto">
                        Ensuring that every member of our family can thrive, not just survive.
                    </p>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
