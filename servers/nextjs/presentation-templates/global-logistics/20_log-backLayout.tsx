import React from 'react'
import * as z from 'zod'


export const layoutId = "log-back"
export const layoutName = "20. Back Cover"
export const layoutDescription = "QR code and details."

export const Schema = z.object({
    company: z.string().default("TRANS_GLOBAL"),
    web: z.string().default("transglobal.logistics"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#0f172a] text-white flex flex-col items-center justify-center p-20"
                style={{
                    fontFamily: "'Roboto Mono', monospace",
                }}
            >
                <div className="bg-white p-4 mb-12">
                    <div className="w-40 h-40 bg-black flex items-center justify-center text-xs text-center text-gray-500">
                        [QR CODE]
                    </div>
                </div>

                <h2 className="text-6xl font-black uppercase italic mb-4 tracking-wider" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {data?.company}
                </h2>

                <div className="text-[#ea580c] font-bold text-xl mb-12">
            > {data?.web}_
                </div>

                <div className="text-gray-500 text-xs max-w-2xl text-center leading-loose">
                    © 2024 Trans_Global Logistics. All Rights Reserved.<br />
                    Printed on Recycled Pixels.
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
