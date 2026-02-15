import React from 'react'
import * as z from 'zod'


export const layoutId = "mfg-sourcing"
export const layoutName = "05. Supply Chain Sourcing"
export const layoutDescription = "Map of material origins."

export const Schema = z.object({
    title: z.string().default("Raw Material Sourcing"),

    description: z.string().default("Ensuring conflict-free and sustainable procurement from certified global partners."),

    materials: z.array(z.object({
        name: z.string().default("Material"),
        percent: z.string().default("0%"),
        origin: z.string().default("Region"),
    })).min(4).max(4).default([
        { name: "Steel", percent: "45%", origin: "North America" },
        { name: "Aluminum", percent: "25%", origin: "Australia" },
        { name: "Rare Earths", percent: "15%", origin: "Domestic Recycling" },
        { name: "Polymers", percent: "15%", origin: "Europe" },
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
                href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto+Condensed:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white text-[#1A1A1A]"
                style={{
                    fontFamily: "'Roboto Condensed', sans-serif",
                }}
            >
                <div className="flex h-full">
                    {/* Left Content */}
                    <div className="w-[40%] bg-[#F0F2F5] p-16 flex flex-col justify-center border-r-[10px] border-[#1A1A1A]">
                        <h2 className="text-5xl font-bold uppercase mb-6 leading-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
                            {data?.title}
                        </h2>
                        <p className="text-xl text-gray-600 mb-12 font-medium">
                            {data?.description}
                        </p>

                        <div className="space-y-6">
                            {(data?.materials || []).map((mat, idx) => (
                                <div key={idx} className="bg-white p-4 shadow-sm border-l-4 border-[#FFD700] flex justify-between items-center group hover:bg-[#1A1A1A] hover:text-white transition-colors">
                                    <div>
                                        <h3 className="font-bold text-lg">{mat.name}</h3>
                                        <p className="text-xs text-gray-500 group-hover:text-gray-400 font-bold uppercase">{mat.origin}</p>
                                    </div>
                                    <div className="text-3xl font-bold text-[#FFD700]">{mat.percent}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Map Visual */}
                    <div className="w-[60%] relative bg-[#E5E7EB]">
                        {/* Stylized Cargo/Shipping Image Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <span className="text-9xl font-black text-gray-400">LOGISTICS</span>
                        </div>

                        {/* Interactive Dots on Map (Illustration) */}
                        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-black rounded-full animate-ping"></div>
                        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-black rounded-full"></div>
                        <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-black rounded-full"></div>

                        {/* Connecting Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <path d="M200,200 L400,300 L600,400" fill="none" stroke="black" strokeWidth="2" strokeDasharray="5 5" />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
