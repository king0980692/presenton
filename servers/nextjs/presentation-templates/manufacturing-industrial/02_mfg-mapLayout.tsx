import React from 'react'
import * as z from 'zod'


export const layoutId = "mfg-map"
export const layoutName = "02. Global Footprint Map"
export const layoutDescription = "World map with factory locations."

export const Schema = z.object({
    title: z.string().default("Global Operations"),

    locations: z.array(z.object({
        name: z.string().default("Location Name"),
        type: z.string().default("Factory"),
        x: z.number().default(50), // Percentage position
        y: z.number().default(50), // Percentage position
    })).min(4).max(6).default([
        { name: "Detroit HQ", type: "R&D Center", x: 25, y: 35 },
        { name: "Hamburg", type: "Logistics Hub", x: 52, y: 28 },
        { name: "Shanghai", type: "Mega Factory", x: 82, y: 40 },
        { name: "Sao Paulo", type: "Assembly", x: 32, y: 70 },
        { name: "Mumbai", type: "IT Support", x: 70, y: 48 },
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#F0F2F5] text-[#333]"
                style={{
                    fontFamily: "'Roboto Condensed', sans-serif",
                }}
            >
                <div className="p-12 h-full flex flex-col">
                    <h2 className="text-4xl font-bold uppercase mb-8 border-b-4 border-[#FFD700] inline-block pb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        {data?.title}
                    </h2>

                    <div className="flex-1 relative bg-[#D1D5DB] rounded border border-gray-400 overflow-hidden shadow-inner">
                        {/* Simplified World Map Placeholder (Dot Grid) */}
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#9CA3AF 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>

                        {/* World Map Silhouette (CSS Shapes - Simplified) */}
                        <div className="absolute top-[20%] left-[10%] w-[30%] h-[40%] bg-white/50 rounded-full blur-3xl"></div>
                        <div className="absolute top-[20%] right-[10%] w-[40%] h-[50%] bg-white/50 rounded-full blur-3xl"></div>

                        {(data?.locations || []).map((loc, idx) => (
                            <div
                                key={idx}
                                className="absolute flex flex-col items-center group cursor-pointer"
                                style={{ top: `${loc.y}%`, left: `${loc.x}%`, transform: 'translate(-50%, -50%)' }}
                            >
                                <div className="w-4 h-4 rounded-full bg-[#FFD700] border-2 border-black shadow-lg group-hover:scale-150 transition-transform"></div>
                                <div className="mt-2 bg-black text-white px-3 py-1 text-xs font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap rounded">
                                    {loc.name} <span className="text-[#FFD700]">|</span> {loc.type}
                                </div>
                                {/* Radar ripple */}
                                <div className="absolute w-12 h-12 rounded-full border border-[#FFD700] animate-ping opacity-50 -z-10"></div>
                            </div>
                        ))}

                        {/* Map Legend */}
                        <div className="absolute bottom-6 left-6 bg-white p-4 border border-gray-300 shadow-lg text-xs">
                            <div className="flex items-center gap-2 mb-2"><div className="w-3 h-3 bg-[#FFD700] border border-black"></div>Active Site</div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-400 border border-black"></div>Planned</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
