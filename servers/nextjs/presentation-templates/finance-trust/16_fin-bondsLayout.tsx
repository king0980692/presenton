import React from 'react'
import * as z from 'zod'


export const layoutId = "fin-bonds"
export const layoutName = "16. Sustainability Bonds"
export const layoutDescription = "Use of proceeds breakdown."

export const Schema = z.object({
    title: z.string().default("Green Bond Allocation"),

    categories: z.array(z.object({
        cat: z.string().default("Category"),
        amt: z.string().default("$0M"),
        color: z.string().default("#10B981"),
    })).min(3).max(3).default([
        { cat: "Renewable Energy", amt: "$500M", color: "#064e3b" },
        { cat: "Green Buildings", amt: "$300M", color: "#1e3a8a" },
        { cat: "Clean Transportation", amt: "$200M", color: "#d4af37" },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <h2 className="text-4xl font-serif text-gray-800 mb-16 text-center italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {data?.title}
                </h2>

                <div className="flex gap-8 items-end justify-center h-[400px]">
                    {(data?.categories || []).map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center w-64 group">
                            <div className="relative w-full flex flex-col justify-end h-[300px] bg-gray-100 rounded-t-lg overflow-hidden">
                                <div
                                    className="w-full transition-all duration-1000 group-hover:opacity-90"
                                    style={{ height: `${(parseInt(item.amt.replace(/\D/g, '')) / 1000) * 100}%`, backgroundColor: item.color }}
                                ></div>
                            </div>
                            <div className="mt-6 text-center">
                                <div className="text-3xl font-bold text-gray-800 mb-1">{item.amt}</div>
                                <div className="text-gray-500 uppercase tracking-widest text-xs font-bold">{item.cat}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
