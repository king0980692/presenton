import React from 'react'
import * as z from 'zod'


export const layoutId = "hosp-sourcing"
export const layoutName = "14. Ethical Supply"
export const layoutDescription = "Product grid."

export const Schema = z.object({
    title: z.string().default("Conscious Sourcing"),

    description: z.string().default("From organic cotton sheets to fair-trade coffee, we vet every supplier."),
    stat: z.string().default("400+"),
    label: z.string().default("Local Vendors"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fafaf9] p-20 flex"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="w-1/2 pr-16 flex flex-col justify-center">
                    <h2 className="text-6xl text-[#44403c] mb-8 font-serif italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {data?.title}
                    </h2>
                    <p className="text-xl text-[#78716c] font-light mb-12">
                        {data?.description}
                    </p>

                    <div className="bg-[#e7e5e4] p-8 rounded-lg w-fit">
                        <div className="text-5xl font-light text-[#44403c] mb-2">{data?.stat}</div>
                        <div className="uppercase text-xs tracking-widest text-[#78716c]">{data?.label}</div>
                    </div>
                </div>

                <div className="w-1/2 grid grid-cols-2 gap-4">
                    <div className="bg-white p-8 shadow-sm flex items-center justify-center text-center">
                        <div>
                            <div className="text-4xl mb-4">☕</div>
                            <div className="uppercase text-xs tracking-widest text-gray-500">Fair Trade Coffee</div>
                        </div>
                    </div>
                    <div className="bg-white p-8 shadow-sm flex items-center justify-center text-center">
                        <div>
                            <div className="text-4xl mb-4">🛌</div>
                            <div className="uppercase text-xs tracking-widest text-gray-500">Organic Cotton</div>
                        </div>
                    </div>
                    <div className="bg-white p-8 shadow-sm flex items-center justify-center text-center">
                        <div>
                            <div className="text-4xl mb-4">🧼</div>
                            <div className="uppercase text-xs tracking-widest text-gray-500">Biodegradable Soap</div>
                        </div>
                    </div>
                    <div className="bg-white p-8 shadow-sm flex items-center justify-center text-center">
                        <div>
                            <div className="text-4xl mb-4">🪵</div>
                            <div className="uppercase text-xs tracking-widest text-gray-500">FSC Furniture</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
