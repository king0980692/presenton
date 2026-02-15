import React from 'react'
import * as z from 'zod'


export const layoutId = "vibrant-back"
export const layoutName = "10. Vibrant Back Cover"
export const layoutDescription = "Colorful closing page."

export const Schema = z.object({
    website: z.string().default("www.vibrant-impact.org"),
    social: z.string().default("@VibrantImpact"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#FFD700]"
                style={{
                    fontFamily: "'Poppins', sans-serif",
                }}
            >
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                    {/* Spinning Circle */}
                    <div className="absolute w-[800px] h-[800px] rounded-full border-[3px] border-black border-dashed animate-[spin_20s_linear_infinite] opacity-20"></div>

                    <div className="text-center z-10">
                        <h1 className="text-9xl font-black text-black mb-4">
                            THANKS
                        </h1>
                        <h2 className="text-5xl font-bold text-[#6C5CE7] mb-12">
                            FOR WATCHING
                        </h2>

                        <div className="bg-black text-white inline-block px-8 py-4 text-2xl font-bold rounded-full transform rotate-3 hover:scale-110 transition-transform">
                            {data?.website}
                        </div>

                        <div className="mt-8 font-bold text-xl">
                            Socials: {data?.social}
                        </div>
                    </div>

                    {/* Footer Stripe */}
                    <div className="absolute bottom-0 w-full h-12 bg-black flex items-center justify-center gap-20 overflow-hidden">
                        <div className="text-[#FF6B6B] font-bold animate-pulse">#IMPACT</div>
                        <div className="text-[#55E6C1] font-bold animate-pulse">#CREATIVITY</div>
                        <div className="text-[#A29BFE] font-bold animate-pulse">#FUTURE</div>
                        <div className="text-[#FF6B6B] font-bold animate-pulse">#IMPACT</div>
                        <div className="text-[#55E6C1] font-bold animate-pulse">#CREATIVITY</div>
                        <div className="text-[#A29BFE] font-bold animate-pulse">#FUTURE</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
