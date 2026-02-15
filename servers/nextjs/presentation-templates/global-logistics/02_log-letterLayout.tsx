import React from 'react'
import * as z from 'zod'


export const layoutId = "log-letter"
export const layoutName = "02. CEO Letter"
export const layoutDescription = "Text over map."

export const Schema = z.object({
    title: z.string().default("Moving Forward"),

    p1: z.string().default("The global supply chain is under pressure to decarbonize. At Trans_Global, we are not waiting for the changing tides—we are steering the ship."),
    p2: z.string().default("We commit to reducing our absolute Scope 1 emissions by 40% by 2030."),

    name: z.string().default("Capt. James Hook"),
    role: z.string().default("Chief Executive Officer"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Roboto+Mono:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white flex"
                style={{
                    fontFamily: "'Roboto Mono', monospace",
                }}
            >
                <div className="w-[35%] bg-[#1e293b] text-white p-12 flex flex-col justify-between relative overflow-hidden">
                    {/* Map Background */}
                    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover opacity-10 grayscale invert"></div>

                    <div className="z-10 mt-20">
                        <div className="w-32 h-32 rounded-full border-4 border-[#ea580c] overflow-hidden mb-8">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-3xl font-bold uppercase mb-2 font-barlow" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{data?.name}</h3>
                        <p className="text-[#ea580c] tracking-widest text-xs uppercase">{data?.role}</p>
                    </div>

                    <div className="z-10 text-xs text-gray-500">
                        DOC_ID: 2024-CEO-MSG<br />
                        STATUS: PUBLISHED
                    </div>
                </div>

                <div className="w-[65%] p-20 flex flex-col justify-center">
                    <h2 className="text-6xl font-black uppercase italic mb-12 text-[#1e293b]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {data?.title}
                    </h2>

                    <div className="text-lg text-gray-600 space-y-8 leading-relaxed">
                        <p>{data?.p1}</p>
                        <div className="bg-[#f1f5f9] border-l-8 border-[#ea580c] p-6 text-[#334155] font-bold">
                            "{data?.p2}"
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
