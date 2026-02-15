import React from 'react'
import * as z from 'zod'


export const layoutId = "organic-back-cover"
export const layoutName = "10. Organic Back Cover"
export const layoutDescription = "Simple closing page with contact info."

export const Schema = z.object({
    closing_text: z.string().default("Together for a sustainable future."),
    contact_info: z.string().default("contact@greencompany.com | www.greencompany.com"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Open+Sans:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#2E7D32] flex flex-col items-center justify-center text-white"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                {/* Decorative Circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-tl-full"></div>

                <div className="z-10 text-center">
                    <div className="mb-8 text-6xl opacity-80">🌿</div>

                    <h1 className="text-5xl font-bold mb-6 max-w-3xl leading-snug" style={{ fontFamily: "'Merriweather', serif" }}>
                        {data?.closing_text || "Together for a sustainable future."}
                    </h1>

                    <div className="w-20 h-1 bg-[#A5D6A7] mx-auto mb-8 rounded-full"></div>

                    <p className="text-xl font-light opacity-80 tracking-wide">
                        {data?.contact_info || "contact@greencompany.com | www.greencompany.com"}
                    </p>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
