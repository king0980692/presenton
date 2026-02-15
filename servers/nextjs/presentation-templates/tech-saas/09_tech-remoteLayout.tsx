import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-remote"
export const layoutName = "09. Remote Culture"
export const layoutDescription = "World map dots."

export const Schema = z.object({
    title: z.string().default("Distributed Teams"),

    countries: z.string().default("25 Countries"),
    employees: z.string().default("500+ Remote Staff"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Inter:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#020617] text-white flex flex-col items-center justify-center"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center invert"></div>

                <div className="z-10 text-center">
                    <h2 className="text-6xl font-bold mb-12 font-mono" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {data?.title}
                    </h2>

                    <div className="flex gap-20">
                        <div className="bg-[#1e293b]/80 p-8 rounded-xl border border-gray-700 backdrop-blur">
                            <div className="text-5xl font-bold text-[#38bdf8] mb-2">{data?.countries}</div>
                            <div className="text-xs uppercase tracking-widest text-gray-400">Global Presence</div>
                        </div>

                        <div className="bg-[#1e293b]/80 p-8 rounded-xl border border-gray-700 backdrop-blur">
                            <div className="text-5xl font-bold text-[#38bdf8] mb-2">{data?.employees}</div>
                            <div className="text-xs uppercase tracking-widest text-gray-400">Work from Anywhere</div>
                        </div>
                    </div>

                    <div className="mt-12 text-[#a855f7] font-mono animate-pulse">
                        ● LIVE CONNECTION ESTABLISHED
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
