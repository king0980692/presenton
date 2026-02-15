import React from 'react'
import * as z from 'zod'


export const layoutId = "corp-back"
export const layoutName = "10. Corporate Back Cover"
export const layoutDescription = "Standard corporate closing page."

export const Schema = z.object({
    company_name: z.string().default("Global Enterprise Ltd."),
    address: z.string().default("123 Business Blvd, Financial District, New York, NY 10001"),
    website: z.string().default("www.globalenterprise.com"),
    copyright: z.string().default("© 2024 Global Enterprise Ltd. All rights reserved."),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#F1F5F9]"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="h-full flex flex-col justify-end p-20">
                    <div className="w-full border-t border-[#CBD5E1] pt-12">
                        <h2 className="text-4xl font-bold text-[#0A192F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {data?.company_name}
                        </h2>

                        <div className="flex justify-between items-end text-[#64748B]">
                            <div className="space-y-2">
                                <p>{data?.address}</p>
                                <p className="font-bold text-[#C5A059]">{data?.website}</p>
                            </div>

                            <div className="text-sm border-l border-[#CBD5E1] pl-6">
                                <p>{data?.copyright}</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Logo Placeholder */}
                    <div className="absolute top-20 right-20 opacity-5 text-[#0A192F] text-9xl font-serif font-bold">
                        LOGO
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
