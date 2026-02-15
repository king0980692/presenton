import React from 'react'
import * as z from 'zod'


export const layoutId = "re-waste-mgmt"
export const layoutName = "15. Circular Waste"
export const layoutDescription = "Construction waste breakdown."

export const Schema = z.object({
    title: z.string().default("Zero Waste Sites"),

    diverted: z.string().default("85%"),
    label: z.string().default("Construction Waste Diverted from Landfill"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#713f12] text-white flex"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <div className="w-1/2 bg-[url('https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg')] bg-cover grayscale opacity-50 relative">
                    <div className="absolute inset-0 bg-[#713f12] mix-blend-multiply"></div>
                </div>

                <div className="w-1/2 p-20 flex flex-col justify-center">
                    <h2 className="text-5xl font-bold uppercase mb-12" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        {data?.title}
                    </h2>

                    <div className="border-4 border-white p-12 relative mb-8">
                        <div className="absolute -top-6 left-10 bg-[#713f12] px-4 font-bold text-gray-400 uppercase tracking-widest">Key Metric</div>

                        <div className="text-9xl font-black mb-4">{data?.diverted}</div>
                        <div className="text-xl font-bold uppercase tracking-wide opacity-80">{data?.label}</div>
                    </div>

                    <div className="flex gap-4 text-sm font-bold uppercase tracking-widest opacity-60">
                        <span>• Reuse</span>
                        <span>• Recycle</span>
                        <span>• Recover</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
