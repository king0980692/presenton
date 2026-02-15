import React from 'react'
import * as z from 'zod'


export const layoutId = "retail-circular"
export const layoutName = "08. Circular Economy"
export const layoutDescription = "Process chart for resale."

export const Schema = z.object({
    title: z.string().default("Refashioned Loop"),

    steps: z.array(z.string()).min(4).max(4).default([
        "Buy It",
        "Love It",
        "Return It",
        "Resell / Recycle",
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
                href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Mulish:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fff1f2] p-16 flex flex-col justify-center"
                style={{
                    fontFamily: "'Mulish', sans-serif",
                }}
            >
                <h2 className="text-4xl font-serif text-[#9f1239] mb-20 text-center" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    {data?.title}
                </h2>

                <div className="relative flex justify-between px-16">
                    {/* Dotted Loop Line */}
                    <div className="absolute top-1/2 left-0 w-full h-full -z-10 border-t-4 border-dashed border-[#fda4af] transform -translate-y-full"></div>

                    {(data?.steps || []).map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-6">
                            <div className="w-40 h-40 bg-white rounded-full border-4 border-[#fb7185] flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
                                <span className="text-4xl">
                                    {idx === 0 && "🛍️"}
                                    {idx === 1 && "❤️"}
                                    {idx === 2 && "📦"}
                                    {idx === 3 && "♻️"}
                                </span>
                            </div>
                            <div className="font-bold text-xl text-[#881337] uppercase tracking-wide">{step}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
