import React from 'react'
import * as z from 'zod'


export const layoutId = "re-leed"
export const layoutName = "04. Green Certification"
export const layoutDescription = "LEED Gold/Platinum badges."

export const Schema = z.object({
    title: z.string().default("Certified Excellence"),

    gold_count: z.string().default("12"),
    plat_count: z.string().default("5"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-20 flex"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <div className="w-1/2 pr-12 border-r border-gray-200">
                    <h2 className="text-6xl font-bold mb-12 text-[#1f2937] uppercase leading-none" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        {data?.title}
                    </h2>
                    <p className="text-gray-500 text-lg mb-12">
                        We design to the highest standards of energy efficiency and environmental health.
                    </p>

                    <div className="flex gap-4">
                        <div className="bg-[#10b981] text-white px-6 py-2 uppercase font-bold text-sm tracking-widest">LEED</div>
                        <div className="bg-[#374151] text-white px-6 py-2 uppercase font-bold text-sm tracking-widest">WELL</div>
                        <div className="bg-[#9ca3af] text-white px-6 py-2 uppercase font-bold text-sm tracking-widest">Fitwel</div>
                    </div>
                </div>

                <div className="w-1/2 pl-12 flex flex-col justify-center gap-12">
                    <div className="flex items-center gap-8">
                        <div className="w-32 h-32 rounded-full border-8 border-[#fbbf24] flex items-center justify-center text-4xl font-bold text-[#b45309]">
                            {data?.gold_count}
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[#1f2937] uppercase">LEED Gold</div>
                            <div className="text-gray-400">Projects Certified</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="w-32 h-32 rounded-full border-8 border-[#374151] flex items-center justify-center text-4xl font-bold text-[#1f2937]">
                            {data?.plat_count}
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[#1f2937] uppercase">LEED Platinum</div>
                            <div className="text-gray-400">Projects Certified</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
