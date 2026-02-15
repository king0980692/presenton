import React from 'react'
import * as z from 'zod'


export const layoutId = "minimal-stats"
export const layoutName = "4. Impact by Numbers"
export const layoutDescription = "Large numbers layout without frames."

export const Schema = z.object({
  stat_title: z.string().min(5).max(70).default("IMPACT BY NUMBERS").meta({
    description: "Main heading text. Max 10 words",
  }),

  metrics_list: z.array(z.object({
    value: z.string().min(1).max(10).default("100").meta({ description: "Metric value" }),
    label: z.string().min(2).max(20).default("Label").meta({ description: "Metric label" }),
    description: z.string().max(100).default("").meta({ description: "Metric description" }),
  })).min(1).max(3).default([{ "value": "100%", "label": "RENEWABLE", "description": "Global energy usage" }, { "value": "0", "label": "WASTE", "description": "To landfill since 2020" }, { "value": "5M", "label": "PLANTED", "description": "Trees in urban areas" }]).meta({
    description: "Key metrics to display",
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
        className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
        style={{
          fontFamily: "var(--heading-font-family, Inter)",
          backgroundColor: 'var(--card-background-color, #FFFFFF)',
        }}
      >
        <div className="relative w-full h-full">
          <div style={{ position: 'absolute', left: '10%', top: '10%', width: '80%', height: '10%', zIndex: 10 }}>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--text-heading-color, #111827)', textAlign: 'left' }}>
              {data?.stat_title || "IMPACT BY NUMBERS"}
            </h2>
          </div>

          <div style={{ position: 'absolute', left: '10%', top: '30%', width: '80%', height: '50%', zIndex: 10 }}>
            <div className="grid grid-cols-3 gap-6">
              {(data?.metrics_list || []).map((metric, idx) => (
                <div key={idx} className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--secondary-accent-color, #F3F4F6)' }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: 'var(--primary-accent-color, #9333ea)' }}>
                    {metric.value}
                  </div>
                  <div className="font-semibold mb-1" style={{ color: 'var(--text-heading-color, #111827)' }}>
                    {metric.label}
                  </div>
                  {metric.description && (
                    <div className="text-sm" style={{ color: 'var(--text-body-color, #6B7280)' }}>
                      {metric.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DynamicSlideLayout
