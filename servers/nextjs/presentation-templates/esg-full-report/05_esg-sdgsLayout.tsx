import React from 'react'
import * as z from 'zod'


export const layoutId = "esg-sdgs"
export const layoutName = "05. SDGs Alignment"
export const layoutDescription = "Grid of connected UN Sustainable Development Goals."

export const Schema = z.object({
    heading: z.string().default("Contribution to UN SDGs"),

    description: z.string().default("We have identified 6 priority goals where our business activities can make the most significant contribution."),

    // Simplified selection for demo purposes.
    sdgs: z.array(z.string()).min(3).max(6).default([
        "03_Good_Health",
        "05_Gender_Equality",
        "07_Clean_Energy",
        "08_Decent_Work",
        "12_Consumption",
        "13_Climate_Action",
    ]),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

// Map of SDG colors (approximate)
const sdgColors: { [key: string]: string } = {
    "01": "#E5243B", "02": "#DDA63A", "03": "#4C9F38", "04": "#C5192D",
    "05": "#FF3A21", "06": "#26BDE2", "07": "#FCC30B", "08": "#A21942",
    "09": "#FD6925", "10": "#DD1367", "11": "#FD9D24", "12": "#BF8B2E",
    "13": "#3F7E44", "14": "#0A97D9", "15": "#56C02B", "16": "#00689D", "17": "#19486A"
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-16"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-[#172B4D] mb-4">{data?.heading}</h2>
                    <p className="text-xl text-[#5E6C84] max-w-3xl mx-auto">{data?.description}</p>
                </div>

                <div className="grid grid-cols-6 gap-6 justify-center">
                    {(data?.sdgs || []).map((sdgItem, idx) => {
                        // Extract number from "03_Good_Health" -> "03"
                        const num = sdgItem.split('_')[0];
                        const color = sdgColors[num] || "#333";
                        const label = sdgItem.split('_').slice(1).join(' ');

                        return (
                            <div key={idx} className="flex flex-col gap-2 group cursor-pointer">
                                <div
                                    className="aspect-square w-full rounded flex items-center justify-center text-white font-bold text-5xl shadow-md transition-transform group-hover:-translate-y-2 group-hover:shadow-xl"
                                    style={{ backgroundColor: color }}
                                >
                                    {num}
                                </div>
                                <div className="text-center text-sm font-bold text-[#42526E] uppercase leading-tight mt-2 min-h-[3rem]">
                                    {label}
                                </div>
                                <div className="h-1 w-full bg-[#DFE1E6] rounded group-hover:bg-[#0052CC] transition-colors"></div>
                            </div>
                        )
                    })}
                    {/* Fillers for layout if needed, though grid-cols-6 handles up to 6 nicely */}
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
