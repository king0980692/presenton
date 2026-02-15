import React from 'react'
import * as z from 'zod'


export const layoutId = "minimal-back-cover"
export const layoutName = "6. Back Cover"
export const layoutDescription = "Simple closing page with contact information."

export const Schema = z.object({
    title: z.string().min(5).max(40).default("Thank You").meta({
        description: "Main closing text.",
    }),

    company_name: z.string().min(5).max(50).default("Modern Corp Inc.").meta({
        description: "Company name.",
    }),

    website: z.string().url().default("https://www.moderncorp.com").meta({
        description: "Website URL.",
    }),

    contact_email: z.string().email().default("contact@moderncorp.com").meta({
        description: "Contact email.",
    }),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden flex items-center justify-center text-center"
                style={{
                    fontFamily: "var(--heading-font-family, Inter)",
                    backgroundColor: 'var(--card-background-color, #111827)', // Dark background for back cover
                    color: '#FFFFFF'
                }}
            >
                <div className="flex flex-col items-center">
                    {/* Minimalist Icon/Logo Placeholder */}
                    <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-8 opacity-80">
                        <span className="text-2xl font-bold">M</span>
                    </div>

                    <h1 className="text-6xl font-bold mb-4 tracking-tight">
                        {data?.title || "Thank You"}
                    </h1>

                    <div className="w-24 h-px bg-white opacity-30 my-8"></div>

                    <div className="space-y-2 opacity-80 font-light">
                        <p className="text-xl font-medium">{data?.company_name || "Modern Corp Inc."}</p>
                        <p>{data?.website || "www.moderncorp.com"}</p>
                        <p>{data?.contact_email || "contact@moderncorp.com"}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
