import React from 'react'
import * as z from 'zod'


export const layoutId = "hosp-greenkey"
export const layoutName = "04. Green Key"
export const layoutDescription = "Certificate badge."

export const Schema = z.object({
    title: z.string().default("Certified Green"),

    description: z.string().default("Proud recipients of the Green Key eco-label for excellence in environmental responsibility."),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#ecfccb] flex items-center justify-center p-20"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="bg-white/80 backdrop-blur-md p-20 rounded-[50px] shadow-xl text-center max-w-2xl border border-white">
                    {/* Key Icon */}
                    <div className="w-32 h-32 bg-[#15803d] rounded-full mx-auto mb-10 flex items-center justify-center text-6xl text-white shadow-lg">
                        🗝️
                    </div>

                    <h2 className="text-5xl text-[#15803d] mb-8 font-serif italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {data?.title}
                    </h2>

                    <p className="text-xl text-[#3f6212] leading-relaxed mb-12">
                        {data?.description}
                    </p>

                    <div className="h-px w-32 bg-[#3f6212]/20 mx-auto"></div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
