import React from 'react'
import * as z from 'zod'


export const layoutId = "re-bio"
export const layoutName = "12. Biodiversity"
export const layoutDescription = "Vertical garden layout."

export const Schema = z.object({
    title: z.string().default("Urban Jungles"),

    trees: z.string().default("5,000+"),
    species: z.string().default("Native Species Reintroduced"),

    img: z.string().url().default("https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg"), // Green building
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-[#ecfccb] flex"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <div className="w-[45%] p-20 flex flex-col justify-center">
                    <h2 className="text-6xl font-bold uppercase mb-12 text-[#166534]" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        {data?.title}
                    </h2>

                    <div className="mb-12">
                        <div className="text-8xl font-black text-[#65a30d] mb-4">{data?.trees}</div>
                        <div className="text-xl font-bold text-[#3f6212] uppercase tracking-wide">
                            {data?.species}
                        </div>
                    </div>

                    <p className="text-[#4d7c0f] leading-relaxed">
                        Integrating vertical forests and rooftops gardens to combat the urban heat island effect.
                    </p>
                </div>

                <div className="w-[55%] relative">
                    <img src={data?.img} className="w-full h-full object-cover" />
                    {/* Leaf overlay */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#ecfccb] to-transparent"></div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
