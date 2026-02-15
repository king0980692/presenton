import React from 'react'
import * as z from 'zod'


export const layoutId = "health-back"
export const layoutName = "20. Back Cover"
export const layoutDescription = "Contact and emergency info."

export const Schema = z.object({
    contact_text: z.string().default("For medical inquiries:"),
    email: z.string().default("medinfo@healthcorp.com"),
    emergency: z.string().default("24/7 Patient Hotline: 1-800-HEALTH-01"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Montserrat:wght@400;600;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-teal-900 text-white flex flex-col items-center justify-center p-20 text-center"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center text-4xl mb-8 backdrop-blur-sm">
                    +
                </div>

                <h2 className="text-5xl font-bold mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Advancing Health Together.
                </h2>

                <div className="w-24 h-1 bg-teal-500 mb-12"></div>

                <div className="space-y-4 text-xl font-light">
                    <p className="opacity-70">{data?.contact_text}</p>
                    <p className="font-bold">{data?.email}</p>
                    <p className="text-teal-400 pt-4 font-bold">{data?.emergency}</p>
                </div>

                <div className="mt-auto pt-20 text-sm opacity-50">
                    © {new Date().getFullYear()} HealthCorp Global. All rights reserved.
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
