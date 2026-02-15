import React from 'react'
import * as z from 'zod'


export const layoutId = "mfg-quality"
export const layoutName = "07. Quality Control Metrics"
export const layoutDescription = "Grid of quality assurance stats."

export const Schema = z.object({
    title: z.string().default("Quality Assurance"),

    defect_rate: z.string().default("0.02%"),
    customer_satisfaction: z.string().default("98/100"),
    iso_certified: z.string().default("ISO 9001:2015"),

    inspections: z.string().default("500+ Daily Checks"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto+Condensed:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#2D2D2D] text-white p-16"
                style={{
                    fontFamily: "'Roboto Condensed', sans-serif",
                }}
            >
                <div className="flex justify-between items-center mb-16 border-b border-gray-600 pb-6">
                    <h2 className="text-5xl font-bold uppercase text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        {data?.title}
                    </h2>
                    <div className="bg-[#FFD700] text-[#1A1A1A] px-4 py-1 font-bold rounded-sm uppercase tracking-wide">
                        Certified Excellence
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    {/* Card 1 */}
                    <div className="bg-[#1A1A1A] border-l-8 border-[#22C55E] p-8 flex justify-between items-center shadow-lg">
                        <div>
                            <h3 className="text-gray-400 font-bold uppercase text-sm mb-2">Defect Rate (PPM)</h3>
                            <p className="text-lg text-gray-500">Six Sigma Standard</p>
                        </div>
                        <div className="text-6xl font-bold text-white font-mono">{data?.defect_rate}</div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#1A1A1A] border-l-8 border-[#3B82F6] p-8 flex justify-between items-center shadow-lg">
                        <div>
                            <h3 className="text-gray-400 font-bold uppercase text-sm mb-2">CSAT Score</h3>
                            <p className="text-lg text-gray-500">Customer Assessment</p>
                        </div>
                        <div className="text-6xl font-bold text-white font-mono">{data?.customer_satisfaction}</div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#1A1A1A] border-l-8 border-[#A855F7] p-8 flex justify-between items-center shadow-lg">
                        <div>
                            <h3 className="text-gray-400 font-bold uppercase text-sm mb-2">Certification</h3>
                            <p className="text-lg text-gray-500">Global Standard</p>
                        </div>
                        <div className="text-5xl font-bold text-white font-mono">{data?.iso_certified}</div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-[#1A1A1A] border-l-8 border-[#F97316] p-8 flex justify-between items-center shadow-lg">
                        <div>
                            <h3 className="text-gray-400 font-bold uppercase text-sm mb-2">Inspection Volume</h3>
                            <p className="text-lg text-gray-500">Automated Optical</p>
                        </div>
                        <div className="text-5xl font-bold text-white font-mono">{data?.inspections}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
