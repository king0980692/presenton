import React from 'react'
import * as z from 'zod'


export const layoutId = "fin-letter"
export const layoutName = "03. Letter to Shareholders"
export const layoutDescription = "Two column text with signature."

export const Schema = z.object({
    heading: z.string().default("A Year of Resilience"),

    p1: z.string().default("Despite global headwinds, Royal Trust Bank delivered record performance, driven by our disciplined risk management and strategic investments in digital transformation. We remain committed to creating long-term value for our shareholders."),
    p2: z.string().default("Looking ahead, we are focusing on sustainable finance as a core growth pillar. Our goal is to mobilize $50 billion in green financing by 2030, supporting the transition to a low-carbon economy."),

    signature: z.string().default("Arthur Sterling"),
    role: z.string().default("Chairman of the Board"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-20"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <div className="flex gap-16 h-full">
                    <div className="w-1/3 border-r border-gray-200 pr-10 pt-10">
                        <h2 className="text-5xl font-serif text-[#064e3b] leading-tight mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {data?.heading}
                        </h2>
                        <div className="w-16 h-1 bg-[#d4af37]"></div>
                    </div>

                    <div className="w-2/3 flex flex-col justify-between pt-4">
                        <div className="text-xl text-gray-600 leading-relaxed space-y-8 font-light text-justify">
                            <p>{data?.p1}</p>
                            <p className="font-serif italic text-gray-800 text-2xl pl-8 border-l-4 border-[#d4af37]">
                                "{data?.p2}"
                            </p>
                        </div>

                        <div className="mt-12 self-end text-right">
                            <div className="font-script text-4xl text-[#064e3b] mb-2 font-serif italic">{data?.signature}</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">{data?.role}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
