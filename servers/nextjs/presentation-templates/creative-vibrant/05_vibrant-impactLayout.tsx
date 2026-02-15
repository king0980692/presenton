import React from 'react'
import * as z from 'zod'


export const layoutId = "vibrant-impact"
export const layoutName = "05. Vibrant Impact Bubbles"
export const layoutDescription = "Bubble style statistics."

export const Schema = z.object({
    title: z.string().default("Making Waves"),

    stats: z.array(z.object({
        val: z.string().default("50K"),
        label: z.string().default("Lives Touched"),
        color: z.enum(["pink", "purple", "yellow"]).default("pink"),
    })).min(3).max(3).default([
        { val: "10K+", label: "Trees Planted", color: "purple" },
        { val: "$5M", label: "Donated", color: "yellow" },
        { val: "500", label: "Workshops", color: "pink" },
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
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white"
                style={{
                    fontFamily: "'Poppins', sans-serif",
                }}
            >
                <div className="absolute inset-0 bg-[#F0F0F0]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.1 }}></div>

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-10">
                    <h2 className="text-5xl font-black mb-16 uppercase bg-black text-white px-8 py-2 transform -skew-x-12 border-b-8 border-[#FF6B6B]">
                        {data?.title}
                    </h2>

                    <div className="flex gap-10 items-center">
                        {(data?.stats || []).map((stat, idx) => {
                            let bg = '#FD79A8'; // pink
                            if (stat.color === 'purple') bg = '#6C5CE7';
                            if (stat.color === 'yellow') bg = '#FFD700';
                            const size = idx === 1 ? 'w-80 h-80' : 'w-64 h-64';

                            return (
                                <div
                                    key={idx}
                                    className={`${size} rounded-full border-4 border-black flex flex-col items-center justify-center text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform cursor-pointer overflow-hidden relative`}
                                    style={{ backgroundColor: bg }}
                                >
                                    {/* Shine effect */}
                                    <div className="absolute top-4 right-8 w-8 h-4 bg-white/40 rounded-full transform rotate-45"></div>

                                    <div className="text-5xl font-black text-black leading-tight mb-2">
                                        {stat.val}
                                    </div>
                                    <div className="text-xl font-bold text-black uppercase tracking-tight">
                                        {stat.label}
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
