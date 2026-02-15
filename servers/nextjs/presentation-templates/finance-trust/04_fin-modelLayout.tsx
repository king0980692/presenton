import React from 'react'
import * as z from 'zod'


export const layoutId = "fin-model"
export const layoutName = "04. Business Model"
export const layoutDescription = "Grid layout for value creation."

export const Schema = z.object({
    title: z.string().default("Our Business Model"),

    inputs: z.array(z.string()).default(["Financial Capital", "Human Capital", "Intellectual Capital"]),
    activities: z.array(z.string()).default(["Retail Banking", "Wealth Management", "Corporate Lending"]),
    outputs: z.array(z.string()).default(["Shareholder Returns", "Customer Value", "Community Impact"]),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fafafa] p-16 flex flex-col justify-center"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <h2 className="text-4xl font-serif text-[#064e3b] mb-16 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {data?.title}
                </h2>

                <div className="flex gap-4 items-stretch h-[400px]">
                    {/* Inputs */}
                    <div className="flex-1 bg-white border-t-4 border-[#64748b] p-8 shadow-sm flex flex-col gap-4">
                        <h3 className="text-gray-400 uppercase tracking-widest font-bold mb-4 text-sm">Key Resources</h3>
                        {(data?.inputs || []).map((item, idx) => (
                            <div key={idx} className="bg-gray-100 p-4 rounded text-center font-serif text-lg text-gray-700">{item}</div>
                        ))}
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center justify-center text-gray-300 text-4xl">→</div>

                    {/* Activities */}
                    <div className="flex-1 bg-[#064e3b] text-white p-8 shadow-lg flex flex-col gap-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-[#d4af37] rounded-bl-full opacity-20"></div>
                        <h3 className="text-[#d4af37] uppercase tracking-widest font-bold mb-4 text-sm">Core Activities</h3>
                        {(data?.activities || []).map((item, idx) => (
                            <div key={idx} className="bg-[#065f46] p-4 rounded text-center font-serif text-lg border border-[#047857] shadow-inner">{item}</div>
                        ))}
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center justify-center text-gray-300 text-4xl">→</div>

                    {/* Outputs */}
                    <div className="flex-1 bg-white border-t-4 border-[#d4af37] p-8 shadow-sm flex flex-col gap-4">
                        <h3 className="text-gray-400 uppercase tracking-widest font-bold mb-4 text-sm">Value Created</h3>
                        {(data?.outputs || []).map((item, idx) => (
                            <div key={idx} className="bg-[#fffbeb] p-4 rounded text-center font-serif text-lg text-[#92400e]">{item}</div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
