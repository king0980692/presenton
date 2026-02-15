import React from 'react'
import * as z from 'zod'


export const layoutId = "esg-letter"
export const layoutName = "06. Message from Chairman"
export const layoutDescription = "Executive letter with formal layout."

export const Schema = z.object({
    title: z.string().default("Message from the Chairman"),

    paragraph1: z.string().max(800).default("Sustainability is not just a trend; it is the cornerstone of our long-term strategy. In 2023, we faced unprecedented challenges, yet we remained steadfast in our commitment to environmental stewardship and social responsibility..."),
    paragraph2: z.string().max(800).default("Looking ahead, we are accelerating our transition to a low-carbon economy. We have set ambitious targets to reduce our Scope 1 and 2 emissions by 50% by 2030."),

    name: z.string().default("Robert H. Smith"),
    title_role: z.string().default("Chairman & CEO"),

    signature: z.string().default("Robert H. Smith"), // Simplified text signature

    image: z.object({
        __image_url__: z.string().url().default("https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg").meta({ description: "URL" }),
    }).default({ __image_url__: "https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg" }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&family=Open+Sans:wght@400;600&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white px-20 py-16"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <div className="flex gap-16 h-full">
                    <div className="w-[30%] flex flex-col">
                        <div className="w-full aspect-[3/4] bg-gray-200 mb-6 relative">
                            {data?.image?.__image_url__ && (
                                <img
                                    src={data.image.__image_url__}
                                    className="w-full h-full object-cover"
                                />
                            )}
                            <div className="absolute bottom-0 left-0 w-full h-2 bg-[#0052CC]"></div>
                        </div>

                        <h3 className="text-2xl font-bold text-[#172B4D]">{data?.name}</h3>
                        <p className="text-[#5E6C84] font-medium">{data?.title_role}</p>
                    </div>

                    <div className="w-[70%] flex flex-col">
                        <h2 className="text-4xl font-bold text-[#0052CC] mb-8 pb-4 border-b border-[#DFE1E6]">
                            {data?.title}
                        </h2>

                        <div className="text-lg leading-loose text-[#172B4D] space-y-6 font-light font-opensans">
                            <p>{data?.paragraph1}</p>
                            <p>{data?.paragraph2}</p>
                        </div>

                        <div className="mt-auto pt-8">
                            <div className="text-3xl font-serif italic text-[#172B4D] opacity-80">
                                {data?.signature}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
