import React from 'react'
import * as z from 'zod'
import {
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    Label
} from 'recharts'

export const layoutId = "esg-matrix"
export const layoutName = "04. Materiality Matrix"
export const layoutDescription = "Scatter plot for materiality analysis."

export const Schema = z.object({
    title: z.string().default("Materiality Matrix"),

    topics: z.array(z.object({
        topic: z.string().default("Topic Name"),
        impact_x: z.number().min(0).max(10).default(5), // Impact on Business (X)
        impact_y: z.number().min(0).max(10).default(5), // Impact on Stakeholders (Y)
        category: z.enum(["Environment", "Social", "Governance"]).default("Environment"),
    })).min(6).max(8).default([
        { topic: "Energy", impact_x: 8.5, impact_y: 9.0, category: "Environment" },
        { topic: "Climate", impact_x: 9.5, impact_y: 9.5, category: "Environment" },
        { topic: "Ethics", impact_x: 9.0, impact_y: 8.5, category: "Governance" },
        { topic: "Privacy", impact_x: 8.0, impact_y: 7.5, category: "Governance" },
        { topic: "Safety", impact_x: 7.5, impact_y: 8.0, category: "Social" },
        { topic: "Diversity", impact_x: 6.5, impact_y: 7.0, category: "Social" },
    ]),
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
    data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden bg-white p-10"
                style={{
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-4xl font-bold text-[#172B4D]">{data?.title}</h2>
                    <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#00B8D9]"></div>Environment</div>
                        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#FF5630]"></div>Social</div>
                        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#36B37E]"></div>Governance</div>
                    </div>
                </div>

                <div className="w-full h-[550px] bg-[#F4F5F7] rounded border border-[#DFE1E6] p-4 relative">
                    {/* Labels for Quadrants */}
                    <div className="absolute top-4 right-4 text-xs font-bold text-gray-400 bg-white/80 p-1 rounded">High Priority</div>

                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" dataKey="impact_x" name="Impact on Business" domain={[0, 10]} label={{ value: 'Significance of Economic, Environmental, & Social Impacts', position: 'bottom', offset: 0 }} />
                            <YAxis type="number" dataKey="impact_y" name="Impact on Stakeholders" domain={[0, 10]} label={{ value: 'Influence on Stakeholder Assessments & Decisions', angle: -90, position: 'left' }} />
                            <ZAxis range={[100, 100]} /> {/* Fixed bubble size */}
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />

                            {/* Scatter Groups by Category */}
                            <Scatter name="Environment" data={data?.topics?.filter(t => t.category === "Environment")} fill="#00B8D9" />
                            <Scatter name="Social" data={data?.topics?.filter(t => t.category === "Social")} fill="#FF5630" />
                            <Scatter name="Governance" data={data?.topics?.filter(t => t.category === "Governance")} fill="#36B37E" />

                            {/* Reference Lines to create quadrants */}
                            <ReferenceLine x={5} stroke="#5E6C84" strokeDasharray="5 5" />
                            <ReferenceLine y={5} stroke="#5E6C84" strokeDasharray="5 5" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default DynamicSlideLayout
