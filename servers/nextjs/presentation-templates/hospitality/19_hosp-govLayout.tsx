import React from 'react'
import * as z from 'zod'


export const layoutId = "hosp-gov"
export const layoutName = "19. Governance"
export const layoutDescription = "Signature block."

export const Schema = z.object({
    title: z.string().default("Our Commitment"),

    text: z.string().default("We pledge to uphold the highest standards of transparency and integrity in all our operations. Sustainability is not a department; it is our ethos."),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400&family=Great+Vibes&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-20 flex flex-col items-center justify-center text-center"
                style={{
                    fontFamily: "'Lato', sans-serif",
                }}
            >
                <div className="border-4 double border-[#d6d3d1] p-24 max-w-4xl">
                    <h2 className="text-4xl text-[#44403c] mb-12 uppercase tracking-widest font-light">
                        {data?.title}
                    </h2>

                    <p className="text-2xl font-serif italic text-[#78716c] leading-relaxed mb-16">
                        "{data?.text}"
                    </p>

                    <div className="space-y-4">
                        <div className="text-5xl text-[#a8a29e]" style={{ fontFamily: "'Great Vibes', cursive" }}>Board of Directors</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
