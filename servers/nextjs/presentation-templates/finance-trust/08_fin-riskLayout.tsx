import React from 'react'
import * as z from 'zod'


export const layoutId = "fin-risk"
export const layoutName = "08. Risk Framework"
export const layoutDescription = "Quadrants for risk types."

export const Schema = z.object({
    title: z.string().default("Risk Management Pillars"),

    q1: z.string().default("Credit Risk"),
    q1_desc: z.string().default("Maintaining high asset quality."),
    q2: z.string().default("Market Risk"),
    q2_desc: z.string().default("Hedging volatility exposure."),
    q3: z.string().default("Operational Risk"),
    q3_desc: z.string().default("Resilient systems & processes."),
    q4: z.string().default("Compliance Risk"),
    q4_desc: z.string().default("Adhering to global regulation."),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fafafa] p-16 flex flex-col items-center"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <h2 className="text-4xl font-serif text-[#064e3b] mb-16 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {data?.title}
                </h2>

                <div className="grid grid-cols-2 gap-4 w-full max-w-4xl h-[450px]">
                    <div className="bg-white border border-gray-200 p-10 flex flex-col justify-center items-center text-center hover:border-[#064e3b] transition-colors shadow-sm">
                        <div className="text-4xl mb-4 text-[#064e3b]">🛡️</div>
                        <h3 className="font-serif text-2xl font-bold mb-2 text-gray-800">{data?.q1}</h3>
                        <p className="text-gray-500 font-light">{data?.q1_desc}</p>
                    </div>
                    <div className="bg-white border border-gray-200 p-10 flex flex-col justify-center items-center text-center hover:border-[#064e3b] transition-colors shadow-sm">
                        <div className="text-4xl mb-4 text-[#064e3b]">📉</div>
                        <h3 className="font-serif text-2xl font-bold mb-2 text-gray-800">{data?.q2}</h3>
                        <p className="text-gray-500 font-light">{data?.q2_desc}</p>
                    </div>
                    <div className="bg-white border border-gray-200 p-10 flex flex-col justify-center items-center text-center hover:border-[#064e3b] transition-colors shadow-sm">
                        <div className="text-4xl mb-4 text-[#064e3b]">⚙️</div>
                        <h3 className="font-serif text-2xl font-bold mb-2 text-gray-800">{data?.q3}</h3>
                        <p className="text-gray-500 font-light">{data?.q3_desc}</p>
                    </div>
                    <div className="bg-white border border-gray-200 p-10 flex flex-col justify-center items-center text-center hover:border-[#064e3b] transition-colors shadow-sm">
                        <div className="text-4xl mb-4 text-[#064e3b]">⚖️</div>
                        <h3 className="font-serif text-2xl font-bold mb-2 text-gray-800">{data?.q4}</h3>
                        <p className="text-gray-500 font-light">{data?.q4_desc}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
