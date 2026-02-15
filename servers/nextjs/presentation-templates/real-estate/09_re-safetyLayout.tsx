import React from 'react'
import * as z from 'zod'


export const layoutId = "re-safety"
export const layoutName = "09. Construction Safety"
export const layoutDescription = "Accident free days counter."

export const Schema = z.object({
    title: z.string().default("Safety First"),

    days: z.string().default("1,024"),
    ltir: z.string().default("0.05"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fbbf24] flex items-center justify-center p-20"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <div className="w-full max-w-4xl border-8 border-black p-12 bg-white shadow-[20px_20px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center">
                    <div className="bg-black text-[#fbbf24] px-8 py-2 text-2xl font-bold uppercase mb-8 tracking-widest">
                        Site Notice
                    </div>

                    <h2 className="text-5xl font-bold uppercase mb-12 text-black" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        {data?.title}
                    </h2>

                    <div className="flex gap-20">
                        <div>
                            <div className="text-8xl font-black text-black mb-2">{data?.days}</div>
                            <div className="font-bold text-gray-500 uppercase">Days Without Incident</div>
                        </div>

                        <div className="w-[2px] bg-gray-200"></div>

                        <div>
                            <div className="text-8xl font-black text-black mb-2">{data?.ltir}</div>
                            <div className="font-bold text-gray-500 uppercase">LTIR (Lost Time Rate)</div>
                        </div>
                    </div>
                </div>

                {/* Hazard Stripes */}
                <div className="absolute bottom-0 left-0 w-full h-8 flex">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-black' : 'bg-[#fbbf24]'}`}></div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
