import React from 'react'
import * as z from 'zod'


export const layoutId = "mfg-incident"
export const layoutName = "15. Safety Incident Triangle"
export const layoutDescription = "Heinrich's pyramid visualization."

export const Schema = z.object({
    title: z.string().default("Incident Management"),

    level1: z.string().default("1 Fatalities"),
    level2: z.string().default("10 Lost Time Injuries"),
    level3: z.string().default("30 Minor Injuries"),
    level4: z.string().default("600 Near Misses"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#F4F4F4] p-16 flex flex-col items-center"
                style={{
                    fontFamily: "'Roboto Condensed', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold uppercase mb-12 text-[#1A1A1A]" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    {data?.title}
                </h2>

                {/* Pyramid */}
                <div className="relative w-[600px] flex flex-col items-center gap-1">
                    {/* Top */}
                    <div className="w-[15%] bg-[#EF4444] text-white py-2 text-center font-bold shadow-sm">{data?.level1}</div>

                    {/* Mid 1 */}
                    <div className="w-[35%] bg-[#F59E0B] text-white py-3 text-center font-bold shadow-sm">{data?.level2}</div>

                    {/* Mid 2 */}
                    <div className="w-[60%] bg-[#FACC15] text-[#1A1A1A] py-4 text-center font-bold shadow-sm">{data?.level3}</div>

                    {/* Bottom */}
                    <div className="w-full bg-[#22C55E] text-white py-6 text-center font-bold shadow-sm">{data?.level4}</div>
                </div>

                <p className="mt-8 text-gray-500 italic max-w-xl text-center">
                    We focus on reporting "Near Misses" to proactively prevent serious incidents at the top of the pyramid.
                </p>
            </div>
        </>
    )
}

export default DynamicSlideLayout
