import React from 'react'
import * as z from 'zod'


export const layoutId = "fin-highlights"
export const layoutName = "02. Financial Highlights"
export const layoutDescription = "Big numbers grid."

export const Schema = z.object({
    title: z.string().default("Performance at a Glance"),

    revenue: z.string().default("$12.5B"),
    net_profit: z.string().default("$3.2B"),
    assets: z.string().default("$450B"),
    roe: z.string().default("14.5%"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fafafa] p-16"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <h2 className="text-4xl font-serif text-[#064e3b] mb-16 text-center italic border-b border-[#d4af37] inline-block mx-auto pb-4 px-10" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {data?.title}
                </h2>

                <div className="grid grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <div className="text-center p-8 border border-gray-200 bg-white shadow-sm">
                        <div className="text-gray-500 uppercase tracking-widest text-sm mb-2">Total Revenue</div>
                        <div className="text-6xl font-serif text-[#064e3b] font-bold">{data?.revenue}</div>
                        <div className="text-green-600 text-sm font-bold mt-2">▲ 5.2% YoY</div>
                    </div>

                    <div className="text-center p-8 border border-gray-200 bg-white shadow-sm">
                        <div className="text-gray-500 uppercase tracking-widest text-sm mb-2">Net Profit</div>
                        <div className="text-6xl font-serif text-[#064e3b] font-bold">{data?.net_profit}</div>
                        <div className="text-green-600 text-sm font-bold mt-2">▲ 8.1% YoY</div>
                    </div>

                    <div className="text-center p-8 border border-gray-200 bg-white shadow-sm">
                        <div className="text-gray-500 uppercase tracking-widest text-sm mb-2">Total Assets</div>
                        <div className="text-6xl font-serif text-[#064e3b] font-bold">{data?.assets}</div>
                        <div className="text-gray-400 text-sm font-bold mt-2">Stable</div>
                    </div>

                    <div className="text-center p-8 border border-gray-200 bg-white shadow-sm">
                        <div className="text-gray-500 uppercase tracking-widest text-sm mb-2">Return on Equity</div>
                        <div className="text-6xl font-serif text-[#d4af37] font-bold">{data?.roe}</div>
                        <div className="text-green-600 text-sm font-bold mt-2">Targets Met</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
