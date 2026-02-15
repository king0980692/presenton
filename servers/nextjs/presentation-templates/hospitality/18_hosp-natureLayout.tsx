import React from 'react'
import * as z from 'zod'


export const layoutId = "hosp-nature"
export const layoutName = "18. Nature Positive"
export const layoutDescription = "Timeline infographic."

export const Schema = z.object({
    title: z.string().default("Restoring Nature"),

    steps: z.array(z.string()).min(3).max(3).default([
        "Conserve: Protect 500 hectares of forest",
        "Restore: Replant 10,000 Mangroves",
        "Regenerate: Soil Health Projects",
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
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#f0fdf4] p-20"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <h2 className="text-5xl text-[#166534] mb-20 text-center font-serif italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {data?.title}
                </h2>

                <div className="flex justify-center items-start gap-8 relative">
                    <div className="absolute top-6 left-[10%] w-[80%] h-px bg-[#bbf7d0]"></div>

                    {(data?.steps || []).map((step, idx) => (
                        <div key={idx} className="relative flex flex-col items-center text-center w-64">
                            <div className="w-12 h-12 rounded-full bg-[#166534] text-white flex items-center justify-center font-serif italic text-xl mb-6 shadow-lg z-10">
                                {idx + 1}
                            </div>
                            <div className="font-bold text-[#14532d] mb-2 uppercase tracking-wide text-sm">{step.split(':')[0]}</div>
                            <div className="text-[#166534] font-light">{step.split(':')[1]}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
