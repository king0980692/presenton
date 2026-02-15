import React from 'react'
import * as z from 'zod'


export const layoutId = "retail-product"
export const layoutName = "03. Product Showcase"
export const layoutDescription = "Image gallery with text."

export const Schema = z.object({
    title: z.string().default("This Season's Heroes"),

    p1_name: z.string().default("The Recycled Coat"),
    p1_img: z.string().url().default("https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg"),

    p2_name: z.string().default("Organic Denim"),
    p2_img: z.string().url().default("https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg"),

    p3_name: z.string().default("Vegan Leather"),
    p3_img: z.string().url().default("https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg"),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Mulish:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16"
                style={{
                    fontFamily: "'Mulish', sans-serif",
                }}
            >
                <h2 className="text-5xl font-serif text-[#1c1917] mb-12 text-center italic" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    {data?.title}
                </h2>

                <div className="flex gap-8 h-[450px]">
                    {/* Item 1 */}
                    <div className="flex-1 flex flex-col group cursor-pointer">
                        <div className="flex-1 rounded-t-[100px] rounded-b-lg overflow-hidden relative mb-4">
                            <img src={data?.p1_img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute top-4 right-4 bg-[#c2410c] text-white text-xs font-bold px-3 py-1 rounded-full">New</div>
                        </div>
                        <h3 className="text-center font-bold text-xl text-[#44403c]">{data?.p1_name}</h3>
                    </div>

                    {/* Item 2 */}
                    <div className="flex-1 flex flex-col group cursor-pointer mt-12">
                        <div className="flex-1 rounded-lg overflow-hidden relative mb-4">
                            <img src={data?.p2_img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute top-4 right-4 bg-[#4338ca] text-white text-xs font-bold px-3 py-1 rounded-full">Best Seller</div>
                        </div>
                        <h3 className="text-center font-bold text-xl text-[#44403c]">{data?.p2_name}</h3>
                    </div>

                    {/* Item 3 */}
                    <div className="flex-1 flex flex-col group cursor-pointer">
                        <div className="flex-1 rounded-t-[100px] rounded-b-lg overflow-hidden relative mb-4">
                            <img src={data?.p3_img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <h3 className="text-center font-bold text-xl text-[#44403c]">{data?.p3_name}</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
