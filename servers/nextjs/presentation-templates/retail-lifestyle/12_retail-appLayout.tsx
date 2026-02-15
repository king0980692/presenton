import React from 'react'
import * as z from 'zod'


export const layoutId = "retail-app"
export const layoutName = "12. Loyalty App"
export const layoutDescription = "Phone mockup with growth stats."

export const Schema = z.object({
    title: z.string().default("Digital Membership"),

    users: z.string().default("1.2M"),
    active_rate: z.string().default("65%"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Mulish:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#fafaf9] p-16 flex items-center"
                style={{
                    fontFamily: "'Mulish', sans-serif",
                }}
            >
                <div className="w-1/2 relative flex justify-center">
                    {/* Phone Body */}
                    <div className="w-[300px] h-[600px] bg-black rounded-[40px] border-[12px] border-black shadow-2xl overflow-hidden relative">
                        <div className="w-full h-full bg-white flex flex-col">
                            <div className="h-64 bg-[#c2410c] p-8 flex flex-col justify-end text-[#ffedd5]">
                                <div className="text-sm uppercase tracking-widest font-bold">Hello, Sarah</div>
                                <div className="text-4xl font-serif mt-2">1,250 Pts</div>
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="h-20 bg-gray-100 rounded-xl"></div>
                                <div className="h-20 bg-gray-100 rounded-xl"></div>
                                <div className="h-20 bg-gray-100 rounded-xl"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 pl-12 text-[#1c1917]">
                    <h2 className="text-5xl font-serif italic mb-12" style={{ fontFamily: "'DM Serif Display', serif" }}>
                        {data?.title}
                    </h2>

                    <div className="flex flex-col gap-10">
                        <div>
                            <div className="text-7xl font-black text-[#c2410c]">{data?.users}</div>
                            <div className="text-xl font-bold uppercase tracking-widest text-[#78716c]">Total Members</div>
                        </div>
                        <div>
                            <div className="text-7xl font-black text-[#c2410c]">{data?.active_rate}</div>
                            <div className="text-xl font-bold uppercase tracking-widest text-[#78716c]">Active Monthly</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
