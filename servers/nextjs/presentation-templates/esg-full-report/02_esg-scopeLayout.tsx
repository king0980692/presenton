import React from 'react'
import * as z from 'zod'


export const layoutId = "esg-scope"
export const layoutName = "02. About This Report"
export const layoutDescription = "Text-heavy page describing reporting scope."

export const Schema = z.object({
    heading: z.string().default("About This Report"),

    period: z.string().default("January 1, 2023 to December 31, 2023"),
    scope: z.string().default("This report covers the activities of Global Corp and its subsidiaries worldwide."),
    standards: z.string().default("Prepared in accordance with the GRI Standards: Core option."),
    assurance: z.string().default("External assurance provided by SGS Taiwan Ltd."),
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
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white"
                style={{
                    fontFamily: "'Open Sans', sans-serif",
                }}
            >
                <div className="flex h-full">
                    {/* Sidebar */}
                    <div className="w-[20%] bg-[#F4F5F7] p-10 border-r border-[#DFE1E6]">
                        <h2 className="text-3xl font-bold text-[#172B4D] mb-8">{data?.heading}</h2>
                        <div className="w-10 h-1 bg-[#0052CC] mb-8"></div>
                        <p className="text-sm text-[#5E6C84]">
                            We are committed to transparent disclosure of our sustainability performance.
                        </p>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-16 grid grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-[#0052CC] mb-2 uppercase tracking-wide">Reporting Period</h3>
                                <p className="text-[#172B4D] text-lg leading-relaxed">{data?.period}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[#0052CC] mb-2 uppercase tracking-wide">Reporting Scope</h3>
                                <p className="text-[#172B4D] text-lg leading-relaxed">{data?.scope}</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-[#0052CC] mb-2 uppercase tracking-wide">Reporting Framework</h3>
                                <p className="text-[#172B4D] text-lg leading-relaxed">{data?.standards}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[#0052CC] mb-2 uppercase tracking-wide">External Assurance</h3>
                                <p className="text-[#172B4D] text-lg leading-relaxed">{data?.assurance}</p>
                            </div>
                        </div>

                        {/* Footer Note */}
                        <div className="col-span-2 mt-auto border-t border-[#DFE1E6] pt-6 text-sm text-[#6B778C]">
                            For any inquiries regarding this report, please contact: csr@globalcorp.com
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
