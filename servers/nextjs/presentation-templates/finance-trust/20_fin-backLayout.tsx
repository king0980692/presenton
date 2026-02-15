import React from 'react'
import * as z from 'zod'


export const layoutId = "fin-back"
export const layoutName = "20. Back Cover IR"
export const layoutDescription = "Elegant contact info."

export const Schema = z.object({
    company: z.string().default("Royal Trust Bank"),
    email: z.string().default("ir@royaltrust.com"),
    web: z.string().default("investors.royaltrust.com"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white border-[20px] border-[#064e3b] p-20 flex flex-col justify-between items-center text-center"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <div className="mt-20">
                    <div className="text-[#064e3b] font-bold tracking-[0.3em] uppercase mb-8">
                        {data?.company}
                    </div>
                    <h2 className="text-5xl font-serif italic text-gray-800 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Building Wealth.<br />Securing Futures.
                    </h2>
                </div>

                <div className="mb-10">
                    <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8"></div>

                    <div className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-4">
                        Investor Relations
                    </div>
                    <div className="text-xl text-[#064e3b] font-serif italic mb-2">
                        {data?.email}
                    </div>
                    <div className="text-lg font-bold">
                        {data?.web}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
