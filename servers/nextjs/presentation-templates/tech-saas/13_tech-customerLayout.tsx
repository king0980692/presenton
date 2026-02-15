import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-customer"
export const layoutName = "13. Customer Transformation"
export const layoutDescription = "Case study quote."

export const Schema = z.object({
    quote: z.string().default("Neural_Core helped us reduce our logistics emissions by 30% through their AI route optimization."),
    company: z.string().default("Global Logistics Corp"),
    author: z.string().default("COO, John Smith"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Inter:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-black text-white p-20 flex flex-col justify-center"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <div className="text-[#a855f7] font-mono text-sm mb-8 tracking-widest">CUSTOMER_SUCCESS.LOG</div>

                <blockquote className="text-5xl font-light leading-snug border-l-8 border-[#a855f7] pl-12 mb-12 text-gray-200">
                    "{data?.quote}"
                </blockquote>

                <div className="self-end text-right">
                    <div className="text-3xl font-bold text-[#a855f7] mb-2">{data?.company}</div>
                    <div className="text-gray-400 font-mono">{data?.author}</div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
