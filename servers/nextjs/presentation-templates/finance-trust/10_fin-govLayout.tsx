import React from 'react'
import * as z from 'zod'


export const layoutId = "fin-gov"
export const layoutName = "10. Corporate Governance"
export const layoutDescription = "Org chart style governance."

export const Schema = z.object({
    title: z.string().default("Governance Structure"),

    board: z.string().default("Board of Directors"),
    committees: z.array(z.string()).min(3).max(3).default(["Audit Committee", "Risk Committee", "ESG Committee"]),
    exec: z.string().default("Executive Management"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16 flex flex-col items-center"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <h2 className="text-4xl font-serif text-[#064e3b] mb-20 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {data?.title}
                </h2>

                {/* Level 1: Board */}
                <div className="bg-[#064e3b] text-white px-12 py-6 rounded-sm shadow-lg border border-[#047857] w-[400px] text-center mb-12 relative z-10">
                    <h3 className="text-2xl font-serif">{data?.board}</h3>
                </div>

                {/* Connector */}
                <div className="w-1 h-12 bg-gray-300 -mt-12 mb-0"></div>
                <div className="w-[600px] h-1 bg-gray-300 mb-8 relative">
                    <div className="absolute top-0 left-0 w-1 h-8 bg-gray-300"></div>
                    <div className="absolute top-0 left-1/2 w-1 h-8 bg-gray-300 transform -translate-x-1/2"></div>
                    <div className="absolute top-0 right-0 w-1 h-8 bg-gray-300"></div>
                </div>

                {/* Level 2: Committees */}
                <div className="flex justify-between w-full max-w-4xl mb-12">
                    {(data?.committees || []).map((comm, idx) => (
                        <div key={idx} className="bg-white border-t-4 border-[#d4af37] px-8 py-4 shadow-sm w-[250px] text-center">
                            <div className="font-bold text-gray-700">{comm}</div>
                        </div>
                    ))}
                </div>

                {/* Connector */}
                <div className="w-1 h-12 bg-gray-300 -mt-12 mb-8"></div>

                {/* Level 3: Exec */}
                <div className="bg-gray-100 text-gray-800 px-12 py-4 rounded-sm border border-gray-300 w-[300px] text-center">
                    <h3 className="font-bold uppercase tracking-widest text-sm">{data?.exec}</h3>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
