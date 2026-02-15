import React from 'react'
import * as z from 'zod'


export const layoutId = "fin-network"
export const layoutName = "15. Omnichannel Network"
export const layoutDescription = "Map and digital stats."

export const Schema = z.object({
    title: z.string().default("Serving Clients Everywhere"),

    branches: z.string().default("450+"),
    atms: z.string().default("1,200+"),
    digital_users: z.string().default("5M+"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#064e3b] text-white p-16"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <div className="flex h-full items-center">
                    <div className="w-1/2 pr-12">
                        <h2 className="text-5xl font-serif italic mb-12 text-[#d4af37]" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {data?.title}
                        </h2>

                        <div className="space-y-8">
                            <div className="bg-[#065f46] p-6 border-l-4 border-white">
                                <div className="text-4xl font-bold mb-1">{data?.branches}</div>
                                <div className="text-xs uppercase tracking-widest opacity-70">Physical Branches</div>
                            </div>
                            <div className="bg-[#065f46] p-6 border-l-4 border-white">
                                <div className="text-4xl font-bold mb-1">{data?.atms}</div>
                                <div className="text-xs uppercase tracking-widest opacity-70">Global ATR Network</div>
                            </div>
                            <div className="bg-[#065f46] p-6 border-l-4 border-[#d4af37]">
                                <div className="text-4xl font-bold mb-1 text-[#d4af37]">{data?.digital_users}</div>
                                <div className="text-xs uppercase tracking-widest opacity-70 text-[#d4af37]">Digital Platform Users</div>
                            </div>
                        </div>
                    </div>

                    <div className="w-1/2 relative h-full bg-[#065f46] rounded-lg overflow-hidden opacity-50">
                        {/* Map Placeholder */}
                        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center invert opacity-30"></div>
                        {/* Animated Dots */}
                        <div className="absolute top-[30%] left-[20%] w-2 h-2 bg-white rounded-full animate-ping"></div>
                        <div className="absolute top-[40%] right-[30%] w-2 h-2 bg-white rounded-full animate-ping delay-75"></div>
                        <div className="absolute bottom-[30%] left-[40%] w-2 h-2 bg-white rounded-full animate-ping delay-150"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
