import React from 'react'
import * as z from 'zod'


export const layoutId = "mfg-back"
export const layoutName = "20. Back Cover"
export const layoutDescription = "Contact info and certifications."

export const Schema = z.object({
    contact_email: z.string().default("investor.relations@apexindustries.com"),
    website: z.string().default("www.apexindustries.com"),
    address: z.string().default("100 Industrial Parkway, Detroit, MI 48201"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#1A1A1A] text-white flex flex-col justify-between"
                style={{
                    fontFamily: "'Roboto Condensed', sans-serif",
                }}
            >
                {/* Top Diagonal Graphic */}
                <div className="h-[60%] bg-[#2D2D2D] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[50%] h-full bg-[#FFD700] transform -skew-x-12 origin-top-right"></div>
                    <div className="absolute top-20 right-20 text-[#1A1A1A] text-right">
                        <h2 className="text-6xl font-bold uppercase mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>Thank You</h2>
                        <p className="text-xl font-bold">For Trusting APEX Heavy Industries</p>
                    </div>
                </div>

                {/* Bottom Contact */}
                <div className="h-[40%] p-16 flex justify-between items-end">
                    <div>
                        <div className="text-gray-400 uppercase tracking-widest text-sm mb-4">Contact Information</div>
                        <div className="text-2xl font-bold mb-2">{data?.website}</div>
                        <div className="text-xl mb-2">{data?.contact_email}</div>
                        <div className="text-lg text-gray-500">{data?.address}</div>
                    </div>

                    <div className="flex gap-4 opacity-50">
                        <div className="w-16 h-16 bg-white rounded flex items-center justify-center text-black font-bold text-xs p-1 text-center">ISO 9001</div>
                        <div className="w-16 h-16 bg-white rounded flex items-center justify-center text-black font-bold text-xs p-1 text-center">ISO 14001</div>
                        <div className="w-16 h-16 bg-white rounded flex items-center justify-center text-black font-bold text-xs p-1 text-center">OHSAS 18001</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
