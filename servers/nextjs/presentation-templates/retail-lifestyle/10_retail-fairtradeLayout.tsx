import React from 'react'
import * as z from 'zod'


export const layoutId = "retail-fairtrade"
export const layoutName = "10. Fair Trade Impact"
export const layoutDescription = "Split screen text and list."

export const Schema = z.object({
    title: z.string().default("Fair Trade Certified"),
    logo_url: z.string().default("https://upload.wikimedia.org/wikipedia/commons/4/41/Fairtrade-logo.svg"), // Placeholder or just use text/icon

    benefits: z.array(z.string()).min(3).max(3).default([
        "Guaranteed Minimum Price for Farmers",
        "Community Development Premiums",
        "No Child or Forced Labor",
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white flex"
                style={{
                    fontFamily: "'Mulish', sans-serif",
                }}
            >
                <div className="w-1/3 bg-[#0284c7] flex items-center justify-center p-12">
                    <div className="text-center text-white">
                        <div className="text-9xl mb-4 font-black">⚖️</div>
                        <h2 className="text-4xl font-serif font-bold italic" style={{ fontFamily: "'DM Serif Display', serif" }}>
                            {data?.title}
                        </h2>
                    </div>
                </div>

                <div className="w-2/3 p-20 flex flex-col justify-center">
                    <h3 className="text-gray-400 uppercase tracking-widest font-bold mb-12">Our Commitment</h3>

                    <ul className="space-y-8">
                        {(data?.benefits || []).map((ben, idx) => (
                            <li key={idx} className="text-3xl font-light text-[#1c1917] flex gap-6 items-start">
                                <span className="text-[#0284c7] font-bold">✓</span>
                                {ben}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
