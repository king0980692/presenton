import React from 'react'
import * as z from 'zod'


export const layoutId = "agri-upcycle"
export const layoutName = "15. Upcycled Food"
export const layoutDescription = "Food cycle graphic."

export const Schema = z.object({
    title: z.string().default("Zero Food Waste"),

    tonnes: z.string().default("500 Tons"),
    desc: z.string().default("Ingredients saved from landfill and turned into new snacks."),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,700;1,300&family=Open+Sans:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fdba74] flex"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <div className="w-1/2 p-20 flex flex-col justify-center">
                    <h2 className="text-6xl font-bold mb-8 text-[#9a3412]" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.title}
                    </h2>
                    <p className="text-xl font-bold text-[#c2410c] mb-12">
                        Turning "ugly" produce into beautiful opportunities.
                    </p>
                    <div className="bg-white/50 p-8 rounded-xl backdrop-blur-sm">
                        <div className="text-6xl font-black text-[#9a3412] mb-2">{data?.tonnes}</div>
                        <div className="text-[#9a3412]">{data?.desc}</div>
                    </div>
                </div>

                <div className="w-1/2 flex items-center justify-center p-20">
                    <div className="w-96 h-96 border-8 border-dashed border-[#fff7ed] rounded-full flex items-center justify-center text-center p-12 relative animate-[spin_20s_linear_infinite]">
                        <div className="absolute top-0 left-1/2 w-8 h-8 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-1/2 w-8 h-8 bg-white rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
                    </div>
                    <div className="absolute text-[120px]">🍊</div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
