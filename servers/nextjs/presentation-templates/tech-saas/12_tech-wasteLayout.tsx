import React from 'react'
import * as z from 'zod'


export const layoutId = "tech-waste"
export const layoutName = "12. Global E-Waste"
export const layoutDescription = "Recycling stats."

export const Schema = z.object({
    title: z.string().default("Circular Hardware"),

    recycled: z.string().default("95%"),
    label: z.string().default("Servers Refurbished or Recycled"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0f172a] text-white flex items-center justify-center p-20"
                style={{
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                {/* Background circuit pattern */}
                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/21/Circuit_Board.svg')] bg-cover opacity-10"></div>

                <div className="z-10 text-center border-4 border-[#22c55e] p-20 rounded-3xl bg-[#0f172a]/90 backdrop-blur shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                    <h2 className="text-5xl font-bold mb-12 font-mono" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {data?.title}
                    </h2>

                    <div className="text-9xl font-bold text-[#22c55e] mb-4 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">
                        {data?.recycled}
                    </div>

                    <div className="text-2xl text-gray-300 font-light uppercase tracking-widest">
                        {data?.label}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
