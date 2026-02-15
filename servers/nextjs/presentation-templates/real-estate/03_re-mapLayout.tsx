import React from 'react'
import * as z from 'zod'


export const layoutId = "re-map"
export const layoutName = "03. Project Map"
export const layoutDescription = "Location pins on map."

export const Schema = z.object({
    title: z.string().default("Developing Across the Region"),

    projects: z.array(z.string()).min(3).max(3).default([
        "Azure Tower / Residential",
        "Eco Park / Commercial",
        "Riverfront / Mixed Use",
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
                href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;500;700&family=Roboto:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#e5e7eb] flex flex-col"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center grayscale"></div>

                <div className="z-10 p-16 w-full flex justify-between items-start">
                    <div className="bg-white p-8 shadow-xl max-w-md border-l-8 border-[#374151]">
                        <h2 className="text-4xl font-bold mb-4 text-[#1f2937] uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>
                            {data?.title}
                        </h2>
                        <p className="text-gray-500">
                            Our footprint spans 2 million square meters of sustainable development.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {(data?.projects || []).map((p, idx) => (
                            <div key={idx} className="bg-[#374151] text-white p-4 pl-6 pr-8 shadow-lg flex items-center gap-4 hover:translate-x-[-10px] transition-transform cursor-pointer group">
                                <div className="w-3 h-3 bg-[#10b981] rounded-full group-hover:bg-white transition-colors"></div>
                                <div>
                                    <div className="font-bold uppercase tracking-wide text-sm">{p.split(' / ')[0]}</div>
                                    <div className="text-xs text-gray-400">{p.split(' / ')[1]}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fake decorative map pins */}
                <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-[#ef4444] rounded-full border-2 border-white shadow-md animate-bounce"></div>
                <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-[#ef4444] rounded-full border-2 border-white shadow-md animate-bounce delay-100"></div>
                <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-[#ef4444] rounded-full border-2 border-white shadow-md animate-bounce delay-200"></div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
