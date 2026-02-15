import React from 'react'
import * as z from 'zod'


export const layoutId = "vibrant-action"
export const layoutName = "09. Vibrant Call to Action"
export const layoutDescription = "Strong CTA layout."

export const Schema = z.object({
    headline: z.string().default("READY TO JOIN?"),
    subtext: z.string().default("Don't sit on the sidelines. Be part of the change."),
    button_text: z.string().default("SIGN UP NOW"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-black text-white flex flex-col items-center justify-center"
                style={{
                    fontFamily: "'Poppins', sans-serif",
                }}
            >
                {/* Background Stripes */}
                <div className="absolute inset-0 flex">
                    <div className="w-1/4 h-full bg-[#FF6B6B]"></div>
                    <div className="w-1/4 h-full bg-[#FECDA6]"></div>
                    <div className="w-1/4 h-full bg-[#55E6C1]"></div>
                    <div className="w-1/4 h-full bg-[#5F27CD]"></div>
                </div>

                <div className="relative z-10 text-center bg-white p-20 border-[6px] border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] max-w-4xl">
                    <h2 className="text-7xl font-black text-black mb-6">
                        {data?.headline}
                    </h2>
                    <p className="text-2xl font-bold text-gray-800 mb-10">
                        {data?.subtext}
                    </p>

                    <button className="bg-black text-white text-3xl font-black py-4 px-12 hover:bg-[#FFD700] hover:text-black transition-colors border-2 border-transparent hover:border-black transform hover:-translate-y-1 hover:shadow-lg">
                        👉 {data?.button_text} 👈
                    </button>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
