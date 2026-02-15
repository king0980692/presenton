import React from 'react'
import * as z from 'zod'


export const layoutId = "log-packaging"
export const layoutName = "09. Circular Packaging"
export const layoutDescription = "Box illustration."

export const Schema = z.object({
    title: z.string().default("Re-Use Revolution"),

    description: z.string().default("Switching from single-use pallets to reusable, tracking-enabled smart containers."),
    stat: z.string().default("-500 Tons of Waste"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#ca8a04] text-white flex"
                style={{
                    fontFamily: "'Roboto Mono', monospace",
                }}
            >
                <div className="w-[40%] bg-[#a16207] p-20 flex flex-col justify-center">
                    <div className="text-[150px] leading-none mb-8 opacity-80">📦</div>
                    <h2 className="text-5xl font-black uppercase italic" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {data?.title}
                    </h2>
                </div>

                <div className="w-[60%] p-20 flex flex-col justify-center bg-[#ca8a04]">
                    <p className="text-2xl font-bold mb-12 max-w-lg">
                        {data?.description}
                    </p>

                    <div className="bg-white text-[#a16207] p-8 w-fit shadow-2xl transform rotate-2">
                        <div className="text-4xl font-bold mb-2">{data?.stat}</div>
                        <div className="text-xs uppercase tracking-widest">Annual Impact</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
