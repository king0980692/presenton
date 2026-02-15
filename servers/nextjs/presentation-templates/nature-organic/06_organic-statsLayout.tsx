import React from 'react'
import * as z from 'zod'


export const layoutId = "organic-stats"
export const layoutName = "06. Organic Key Stats"
export const layoutDescription = "Key statistics with soft colorful backgrounds."

export const Schema = z.object({
    title: z.string().default("Year in Numbers"),

    stats: z.array(z.object({
        value: z.string().default("100"),
        label: z.string().default("Label"),
        description: z.string().default("Short description"),
        color: z.enum(["green", "orange", "blue"]).default("green"),
    })).min(3).max(3).default([
        { value: "40%", label: "Water Saved", description: "Reduction in consumption compared to last year.", color: "blue" },
        { value: "1m", label: "Trees Planted", description: "Across 5 critical deforestation zones.", color: "green" },
        { value: "100%", label: "Recyclable", description: "Packaging materials used in 2024.", color: "orange" },
    ]).meta({ description: "3 Key statistics" }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    const getColor = (color: string) => {
        switch (color) {
            case 'blue': return { bg: '#E1F5FE', text: '#0277BD' };
            case 'orange': return { bg: '#FFF3E0', text: '#EF6C00' };
            case 'green':
            default: return { bg: '#E8F5E9', text: '#2E7D32' };
        }
    }

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Open+Sans:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <div className="p-12 flex flex-col h-full">
                    <h2 className="text-4xl font-bold mb-12 text-[#1B5E20]" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.title || "Year in Numbers"}
                    </h2>

                    <div className="flex-1 grid grid-cols-3 gap-8">
                        {(data?.stats || []).map((stat, idx) => {
                            const colors = getColor(stat.color as string)
                            return (
                                <div
                                    key={idx}
                                    className="rounded-[40px] p-8 flex flex-col justify-center items-center text-center transition-transform hover:scale-105"
                                    style={{ backgroundColor: colors.bg }}
                                >
                                    <div className="text-7xl font-bold mb-2 tracking-tight" style={{ color: colors.text }}>
                                        {stat.value}
                                    </div>
                                    <div className="text-xl font-bold mb-4 text-[#37474F]">
                                        {stat.label}
                                    </div>
                                    <div className="w-12 h-1 bg-white/50 mb-4 rounded-full"></div>
                                    <p className="text-[#546E7A] text-sm font-semibold">
                                        {stat.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
