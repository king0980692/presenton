import React from 'react'
import * as z from 'zod'


export const layoutId = "vibrant-toc"
export const layoutName = "02. Vibrant Map TOC"
export const layoutDescription = "Visual map style table of contents."

export const Schema = z.object({
    title: z.string().default("The Adventure"),

    stops: z.array(z.object({
        num: z.string().default("1"),
        label: z.string().default("Start"),
    })).min(5).max(5).default([
        { num: "01", label: "Our Why" },
        { num: "02", label: "The Crew" },
        { num: "03", label: "Big Wins" },
        { num: "04", label: "Stories" },
        { num: "05", label: "Join Us" },
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
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&family=Permanent+Marker&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#F0F0F0]"
                style={{
                    fontFamily: "'Poppins', sans-serif",
                }}
            >
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ddd 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

                <div className="relative z-10 w-full h-full p-16 flex flex-col">
                    <h2 className="text-5xl font-black text-black mb-12 transform -rotate-2 inline-block bg-[#FFD700] px-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        {data?.title}
                    </h2>

                    {/* Path Visualization */}
                    <div className="flex-1 relative flex items-center justify-between px-10">
                        {/* Wavy Line SVG */}
                        <svg className="absolute left-0 top-1/2 w-full h-20 -translate-y-1/2" style={{ overflow: 'visible' }}>
                            <path d="M0,10 C150,100 300,-80 450,10 S750,100 900,10 S1200,-50 1300,10" fill="none" stroke="black" strokeWidth="5" strokeDasharray="15 10" />
                        </svg>

                        {(data?.stops || []).map((stop, idx) => {
                            const colors = ['#FF6B6B', '#6C5CE7', '#00B894', '#E17055', '#FD79A8'];
                            const color = colors[idx % colors.length];
                            const rotation = (idx % 2 === 0) ? 'rotate-3' : '-rotate-3';
                            const yOffset = (idx % 2 === 0) ? 'translate-y-10' : '-translate-y-10';

                            return (
                                <div key={idx} className={`relative z-10 transform ${yOffset}`}>
                                    <div
                                        className={`w-32 h-32 rounded-full border-4 border-black flex flex-col items-center justify-center text-center p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white hover:scale-110 transition-transform cursor-pointer ${rotation}`}
                                    >
                                        <div className="text-3xl font-black mb-1" style={{ color: color }}>
                                            {stop.num}
                                        </div>
                                        <div className="text-sm font-bold leading-tight">
                                            {stop.label}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
