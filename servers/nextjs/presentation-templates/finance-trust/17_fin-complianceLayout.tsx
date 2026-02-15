import React from 'react'
import * as z from 'zod'


export const layoutId = "fin-compliance"
export const layoutName = "17. Compliance & AML"
export const layoutDescription = "Text list with checkmarks."

export const Schema = z.object({
    title: z.string().default("Compliance Excellence"),

    description: z.string().default("Upholding the highest standards of financial integrity."),

    items: z.array(z.string()).min(3).max(3).default([
        "Advanced AML Transaction Monitoring",
        "Global Sanctions Screening",
        "KYC (Know Your Customer) Innovation",
    ]),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fafafa] flex"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <div className="w-1/2 p-20 flex flex-col justify-center">
                    <h2 className="text-5xl font-serif text-[#064e3b] mb-6 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {data?.title}
                    </h2>
                    <p className="text-xl text-gray-500 font-light leading-relaxed mb-12">
                        {data?.description}
                    </p>

                    <div className="space-y-6">
                        {(data?.items || []).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 bg-white p-4 shadow-sm border-l-4 border-[#064e3b]">
                                <div className="text-green-600 text-xl">✓</div>
                                <div className="font-serif text-lg text-gray-800 italic">{item}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-1/2 bg-[#e2e8f0] relative flex items-center justify-center">
                    <div className="w-64 h-80 bg-white shadow-2xl p-8 transform rotate-3 flex flex-col gap-4">
                        <div className="w-full h-4 bg-gray-200 rounded"></div>
                        <div className="w-full h-4 bg-gray-200 rounded"></div>
                        <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
                        <div className="mt-auto self-end w-20 h-20 border-4 border-[#064e3b] rounded-full flex items-center justify-center text-[#064e3b] font-bold transform -rotate-12 uppercase text-xs">
                            Verified
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
