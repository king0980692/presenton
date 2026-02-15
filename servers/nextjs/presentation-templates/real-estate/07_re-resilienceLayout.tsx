import React from 'react'
import * as z from 'zod'


export const layoutId = "re-resilience"
export const layoutName = "07. Climate Resilience"
export const layoutDescription = "Risk adaptation icons."

export const Schema = z.object({
    title: z.string().default("Built for Resilience"),

    risk_1: z.string().default("Flood Protection"),
    risk_2: z.string().default("Heat Island Effect"),
    risk_3: z.string().default("Wind Resistance"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#374151] text-white p-20 flex flex-col items-center"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <h2 className="text-5xl font-bold uppercase mb-20 text-center" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="flex gap-16">
                    {/* Item 1 */}
                    <div className="flex flex-col items-center w-64 text-center">
                        <div className="w-32 h-32 rounded-full bg-[#4b5563] border-4 border-[#10b981] flex items-center justify-center mb-6 text-5xl">
                            🌊
                        </div>
                        <h3 className="text-xl font-bold uppercase mb-2">{data?.risk_1}</h3>
                        <p className="text-sm text-gray-400">Elevated foundations and permeable paving.</p>
                    </div>

                    {/* Item 2 */}
                    <div className="flex flex-col items-center w-64 text-center">
                        <div className="w-32 h-32 rounded-full bg-[#4b5563] border-4 border-[#fbbf24] flex items-center justify-center mb-6 text-5xl">
                            🌡️
                        </div>
                        <h3 className="text-xl font-bold uppercase mb-2">{data?.risk_2}</h3>
                        <p className="text-sm text-gray-400">Green roofs and reflective surfaces.</p>
                    </div>

                    {/* Item 3 */}
                    <div className="flex flex-col items-center w-64 text-center">
                        <div className="w-32 h-32 rounded-full bg-[#4b5563] border-4 border-[#3b82f6] flex items-center justify-center mb-6 text-5xl">
                            🌪️
                        </div>
                        <h3 className="text-xl font-bold uppercase mb-2">{data?.risk_3}</h3>
                        <p className="text-sm text-gray-400">Reinforced structure and facade testing.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
