import React from 'react'
import * as z from 'zod'


export const layoutId = "re-energy"
export const layoutName = "06. Energy Efficiency"
export const layoutDescription = "Infographic about smart buildings."

export const Schema = z.object({
    title: z.string().default("Smart Energy Systems"),

    reduction: z.string().default("30%"),
    description: z.string().default("Reduction in energy use intensity (EUI) compared to baseline."),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-20 flex items-center"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <div className="w-1/2 relative bg-gray-100 h-[500px] rounded-t-full flex items-end justify-center overflow-hidden border-b-8 border-[#374151]">
                    {/* Building illustration silhouette */}
                    <div className="w-40 h-64 bg-[#374151] mx-2 flex flex-col items-center justify-around py-4">
                        <div className="w-32 h-4 bg-[#10b981] animate-pulse"></div>
                        <div className="w-32 h-4 bg-gray-600"></div>
                        <div className="w-32 h-4 bg-gray-600"></div>
                    </div>
                    <div className="w-32 h-48 bg-[#4b5563] mx-2 flex flex-col items-center justify-around py-4">
                        <div className="w-24 h-4 bg-yellow-500 animate-pulse"></div>
                        <div className="w-24 h-4 bg-gray-500"></div>
                    </div>

                    <div className="absolute top-10 text-center">
                        <div className="text-lg font-bold uppercase tracking-widest text-gray-500 mb-2">Solar Capacity</div>
                        <div className="text-3xl font-bold text-[#1f2937]">2.5 MW</div>
                    </div>
                </div>

                <div className="w-1/2 pl-20">
                    <h2 className="text-5xl font-bold uppercase mb-12 text-[#1f2937]" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        {data?.title}
                    </h2>

                    <div className="flex items-start gap-6 mb-8">
                        <div className="text-[#10b981] text-8xl font-black leading-none drop-shadow-md">
                            {data?.reduction}
                        </div>
                        <div className="text-lg text-gray-600 font-bold max-w-xs pt-4 uppercase">
                            {data?.description}
                        </div>
                    </div>

                    <ul className="space-y-4 text-gray-500">
                        <li className="flex items-center gap-2">✓ HVAC Optimization</li>
                        <li className="flex items-center gap-2">✓ LED Lighting with Motion Sensors</li>
                        <li className="flex items-center gap-2">✓ High-Performance Glazing</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
