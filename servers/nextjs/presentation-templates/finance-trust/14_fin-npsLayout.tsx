import React from 'react'
import * as z from 'zod'


export const layoutId = "fin-nps"
export const layoutName = "14. Customer Satisfaction (NPS)"
export const layoutDescription = "NPS score visualization."

export const Schema = z.object({
    title: z.string().default("Customer Trust"),

    nps: z.number().default(45),
    industry_avg: z.number().default(30),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <h2 className="text-4xl font-serif text-[#064e3b] mb-12 italic text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {data?.title}
                </h2>

                <div className="flex flex-col items-center">
                    <div className="relative w-80 h-40 overflow-hidden mb-8">
                        {/* Gauge Arc Background */}
                        <div className="absolute top-0 left-0 w-80 h-80 rounded-full border-[30px] border-gray-100 box-border"></div>
                        {/* Gauge Arc Fill - Approximate for 45/100 scale */}
                        <div className="absolute top-0 left-0 w-80 h-80 rounded-full border-[30px] border-[#064e3b] box-border border-b-transparent border-r-transparent transform -rotate-45"></div>

                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-black rounded-full z-10"></div>
                        {/* Needle */}
                        <div className="absolute bottom-0 left-1/2 w-32 h-1 bg-black origin-left transform -rotate-45 z-0"></div>
                    </div>

                    <div className="text-8xl font-serif text-[#064e3b] font-bold mb-4">
                        +{data?.nps}
                    </div>

                    <div className="text-gray-400 font-bold uppercase tracking-widest mb-12">Net Promoter Score</div>

                    <div className="bg-gray-50 px-8 py-4 rounded-full border border-gray-200">
                        <span className="text-gray-500 mr-2">Industry Average:</span>
                        <span className="font-bold text-gray-800">+{data?.industry_avg}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
