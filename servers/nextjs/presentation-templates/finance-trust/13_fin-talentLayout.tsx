import React from 'react'
import * as z from 'zod'


export const layoutId = "fin-talent"
export const layoutName = "13. Talent & Culture"
export const layoutDescription = "Stats for employee engagement."

export const Schema = z.object({
    title: z.string().default("Cultivating Talent"),

    stats: z.array(z.object({
        val: z.string().default("0"),
        label: z.string().default("Metric"),
    })).min(3).max(3).default([
        { val: "85%", label: "Employee Engagement Score" },
        { val: "48%", label: "Women in Leadership" },
        { val: "$5M", label: "Training Investment" },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fafafa] p-16"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <h2 className="text-4xl font-serif text-[#064e3b] mb-20 text-center italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {data?.title}
                </h2>

                <div className="flex gap-12 justify-center">
                    {(data?.stats || []).map((stat, idx) => (
                        <div key={idx} className="bg-white p-10 shadow-lg border-t-4 border-[#d4af37] w-80 text-center hover:-translate-y-2 transition-transform duration-300">
                            <div className="text-6xl font-serif text-[#064e3b] font-bold mb-6">{stat.val}</div>
                            <div className="h-px w-12 bg-gray-200 mx-auto mb-6"></div>
                            <div className="text-gray-500 font-bold uppercase tracking-widest text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
