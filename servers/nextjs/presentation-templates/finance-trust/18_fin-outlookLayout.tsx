import React from 'react'
import * as z from 'zod'


export const layoutId = "fin-outlook"
export const layoutName = "18. Market Outlook"
export const layoutDescription = "Text and chart placeholder."

export const Schema = z.object({
    title: z.string().default("Economic Outlook"),

    forecast: z.string().default("We anticipate moderate growth in emerging markets, balanced by stabilizing interest rates in developed economies."),
    gdp_growth: z.string().default("2.5%"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#064e3b] text-white p-16"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <h2 className="text-4xl font-serif mb-12 italic text-[#d4af37]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {data?.title}
                </h2>

                <div className="flex gap-16">
                    <div className="w-1/2">
                        <p className="text-2xl font-light leading-relaxed border-l-2 border-[#d4af37] pl-8">
                            {data?.forecast}
                        </p>

                        <div className="mt-12 bg-[#065f46] p-8 inline-block">
                            <div className="text-sm uppercase tracking-widest text-[#d4af37] font-bold mb-2">Global GDP Forecast</div>
                            <div className="text-6xl font-bold">{data?.gdp_growth}</div>
                        </div>
                    </div>

                    <div className="w-1/2 flex items-center justify-center">
                        {/* Trend Line Visual */}
                        <svg viewBox="0 0 400 200" className="w-full h-auto drop-shadow-lg">
                            <path d="M0,150 Q100,100 200,120 T400,50" fill="none" stroke="#d4af37" strokeWidth="4" />
                            <circle cx="0" cy="150" r="4" fill="white" />
                            <circle cx="200" cy="120" r="4" fill="white" />
                            <circle cx="400" cy="50" r="6" fill="white" stroke="#d4af37" strokeWidth="2" />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
