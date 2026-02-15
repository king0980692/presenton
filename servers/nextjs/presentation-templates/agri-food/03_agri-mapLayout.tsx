import React from 'react'
import * as z from 'zod'


export const layoutId = "agri-map"
export const layoutName = "03. Our Farms"
export const layoutDescription = "World map dots."

export const Schema = z.object({
    title: z.string().default("Growing Globally"),

    regions: z.array(z.string()).min(3).max(3).default([
        "Cocoa in West Africa",
        "Wheat in North America",
        "Coffee in South America",
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
                href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,700;1,300&family=Open+Sans:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#14532d] text-[#f0fdf4]"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <div className="absolute inset-0 opacity-20">
                    {/* Map Background */}
                    <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center invert filter brightness-200"></div>
                </div>

                <div className="relative z-10 w-full h-full flex flex-col justify-between p-20">
                    <h2 className="text-6xl font-bold mb-12" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.title}
                    </h2>

                    <div className="grid grid-cols-3 gap-8">
                        {(data?.regions || []).map((region, idx) => (
                            <div key={idx} className="bg-[#166534]/80 backdrop-blur p-8 rounded-2xl border border-[#4ade80]/30 hover:bg-[#15803d] transition-colors">
                                <div className="w-8 h-8 bg-[#fcd34d] rounded-full mb-4 animate-pulse"></div>
                                <div className="font-bold text-xl">{region}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
