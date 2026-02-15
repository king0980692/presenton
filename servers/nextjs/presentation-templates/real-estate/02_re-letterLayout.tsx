import React from 'react'
import * as z from 'zod'


export const layoutId = "re-letter"
export const layoutName = "02. Chairman Letter"
export const layoutDescription = "Blueprint background text."

export const Schema = z.object({
    title: z.string().default("A Solid Foundation"),

    p1: z.string().default("Cities are changing. As developers, we bear the responsibility of shaping skyline that are not only iconic but sustainable."),
    p2: z.string().default("This year, we committed to 100% green certified buildings for all new projects."),

    name: z.string().default("Robert Stone"),
    role: z.string().default("Chairman of the Board"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#f3f4f6]"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                {/* Blueprint Grid Background */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'linear-gradient(#374151 1px, transparent 1px), linear-gradient(90deg, #374151 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}>
                </div>

                <div className="relative z-10 flex h-full">
                    <div className="w-1/3 bg-[#374151] text-white p-12 flex flex-col justify-end">
                        <div className="mb-auto text-6xl text-[#10b981]">❝</div>
                        <div className="text-3xl font-bold uppercase font-oswald mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>{data?.name}</div>
                        <div className="text-gray-400 tracking-widest text-sm uppercase">{data?.role}</div>
                    </div>

                    <div className="w-2/3 p-20 flex flex-col justify-center bg-white/90 backdrop-blur-sm border-l border-gray-300">
                        <h2 className="text-5xl font-bold mb-10 text-[#1f2937] uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>
                            {data?.title}
                        </h2>

                        <div className="text-xl text-gray-600 leading-loose space-y-8">
                            <p>{data?.p1}</p>
                            <p className="font-bold text-[#374151] border-l-4 border-[#10b981] pl-6">
                                {data?.p2}
                            </p>
                        </div>

                        <div className="mt-12 w-32 h-16 opacity-50">
                            {/* Placeholder for signature */}
                            <svg viewBox="0 0 100 50" fill="none" stroke="currentColor" className="text-gray-800">
                                <path d="M10,40 Q30,10 50,30 T90,20" strokeWidth="2" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
