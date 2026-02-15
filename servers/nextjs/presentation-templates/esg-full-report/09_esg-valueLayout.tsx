import React from 'react'
import * as z from 'zod'


export const layoutId = "esg-value"
export const layoutName = "09. Value Creation Model"
export const layoutDescription = "Input-Output diagram for integrated reporting."

export const Schema = z.object({
    title: z.string().default("Value Creation Model"),

    inputs: z.array(z.string()).max(3).default(["Financial Capital", "Human Capital", "Natural Capital"]),
    outputs: z.array(z.string()).max(3).default(["Economic Value", "Employee Growth", "Environmental Protection"]),

    business_activities: z.string().default("R&D -> Manufacturing -> Sales -> Service"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16 flex flex-col"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold text-[#172B4D] mb-12 border-b border-[#DFE1E6] pb-4">{data?.title}</h2>

                <div className="flex items-center justify-between gap-4 flex-1">
                    {/* Inputs Column */}
                    <div className="w-1/4 flex flex-col gap-4">
                        <h3 className="text-center font-bold text-[#5E6C84] uppercase tracking-wide mb-2">Inputs</h3>
                        {(data?.inputs || []).map((item, idx) => (
                            <div key={idx} className="bg-[#EAE6FF] text-[#403294] p-6 rounded-l-xl text-center font-bold border-l-4 border-[#403294] shadow-sm">
                                {item}
                            </div>
                        ))}
                    </div>

                    {/* Central Engine (Arrow Shape) */}
                    <div className="flex-1 h-64 bg-[#0052CC] relative flex items-center justify-center text-white px-10 shadow-lg transform">
                        {/* Arrow Triangle */}
                        <div className="absolute -right-16 top-0 w-0 h-0 border-t-[128px] border-t-transparent border-l-[64px] border-l-[#0052CC] border-b-[128px] border-b-transparent"></div>

                        <div className="text-center">
                            <div className="text-xs uppercase opacity-70 mb-2">Business Activities</div>
                            <div className="text-2xl font-bold tracking-wider">{data?.business_activities}</div>
                        </div>
                    </div>

                    <div className="w-10"></div> {/* Spacer for arrow tip */}

                    {/* Outputs Column */}
                    <div className="w-1/4 flex flex-col gap-4">
                        <h3 className="text-center font-bold text-[#5E6C84] uppercase tracking-wide mb-2">Outputs</h3>
                        {(data?.outputs || []).map((item, idx) => (
                            <div key={idx} className="bg-[#E3FCEF] text-[#006644] p-6 rounded-r-xl text-center font-bold border-r-4 border-[#006644] shadow-sm">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
