import React from 'react'
import * as z from 'zod'


export const layoutId = "re-back"
export const layoutName = "20. Back Cover"
export const layoutDescription = "Contact details."

export const Schema = z.object({
    company: z.string().default("URBAN STRUCTURES"),
    address: z.string().default("123 Skyline Ave, Metro City"),
    contact: z.string().default("info@urbanstructures.com"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#374151] text-white flex flex-col justify-between p-20"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <div className="border-t-4 border-[#10b981] w-32 pt-4">
                    <div className="text-2xl font-bold uppercase tracking-widest">{data?.company}</div>
                </div>

                <div className="flex justify-end items-end h-full">
                    <div className="text-right">
                        <h2 className="text-6xl font-bold uppercase mb-8 text-[#9ca3af]" style={{ fontFamily: "'Oswald', sans-serif" }}>
                            Build With Us
                        </h2>

                        <div className="text-xl text-gray-300 space-y-2 font-light">
                            <div>{data?.address}</div>
                            <div className="text-[#10b981] font-bold">{data?.contact}</div>
                            <div>+1 (555) 000-0000</div>
                        </div>

                        <div className="mt-8 flex justify-end gap-4 opacity-50">
                            <div className="w-8 h-8 bg-white rounded-full"></div>
                            <div className="w-8 h-8 bg-white rounded-full"></div>
                            <div className="w-8 h-8 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
