import React from 'react'
import * as z from 'zod'


export const layoutId = "mfg-community"
export const layoutName = "16. Local Community"
export const layoutDescription = "Photo grid with text for community projects."

export const Schema = z.object({
    title: z.string().default("Community Partners"),

    project1_title: z.string().default("Apprenticeship Program"),
    project1_desc: z.string().default("Training 50 local students annually in advanced welding."),
    project1_img: z.string().url().default("https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg"),

    project2_title: z.string().default("Clean River Initiative"),
    project2_desc: z.string().default("Volunteers cleaning 10km of local waterways."),
    project2_img: z.string().url().default("https://images.pexels.com/photos/957024/water-river-pollution-garbage-957024.jpeg"),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-12"
                style={{
                    fontFamily: "'Roboto Condensed', sans-serif",
                }}
            >
                <h2 className="text-4xl font-bold uppercase mb-10 text-[#1A1A1A]" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    {data?.title}
                </h2>

                <div className="flex gap-8 h-[450px]">
                    {/* Project 1 */}
                    <div className="flex-1 relative group overflow-hidden bg-[#1A1A1A]">
                        <img src={data?.project1_img} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                            <h3 className="text-[#FFD700] text-3xl font-bold uppercase mb-2">{data?.project1_title}</h3>
                            <p className="text-white text-lg">{data?.project1_desc}</p>
                        </div>
                    </div>

                    {/* Project 2 */}
                    <div className="flex-1 relative group overflow-hidden bg-[#1A1A1A]">
                        <img src={data?.project2_img} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                            <h3 className="text-[#FFD700] text-3xl font-bold uppercase mb-2">{data?.project2_title}</h3>
                            <p className="text-white text-lg">{data?.project2_desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
