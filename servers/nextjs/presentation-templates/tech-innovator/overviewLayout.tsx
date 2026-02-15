import React from 'react'
import * as z from 'zod'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

export const layoutId = "overview"
export const layoutName = "Tech Innovation Overview"
export const layoutDescription = "A high-tech, structured layout suitable for semiconductor and technology reports."

export const Schema = z.object({
  sidebar_bg: z.object({
    __image_url__: z.string().url().default("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg").meta({
      description: "Image URL",
    }),
    __image_prompt__: z.string().min(10).max(100).default("abstract circuit board technology blue dark background").meta({
      description: "Image generation prompt",
    }),
  }).default({
    __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    __image_prompt__: "abstract circuit board technology blue dark background"
  }).meta({
    description: "Image with URL and prompt",
  }),

  sidebar_title: z.string().min(5).max(70).default("Innovation at Core").meta({
    description: "Main heading text. Max 10 words",
  }),

  sidebar_text: z.string().min(10).max(350).default("Driving the future of technology through advanced manufacturing processes.").meta({
    description: "Descriptive text. Max 50 words",
  }),

  main_title: z.string().min(5).max(70).default("Annual Sustainability Report").meta({
    description: "Main heading text. Max 10 words",
  }),

  growth_chart: z.object({
    type: z.enum(["bar", "line"]).default("bar"),
    data: z.array(z.object({
      label: z.string().min(1).max(20).default("A").meta({ description: "Data label" }),
      value: z.number().min(0).max(1000).default(50).meta({ description: "Data value" }),
    })).min(2).max(10).default([
      { label: "A", value: 60 },
      { label: "B", value: 45 },
      { label: "C", value: 80 },
      { label: "D", value: 35 },
    ]),
  }).default({
    type: "bar",
    data: [
      { label: "A", value: 60 },
      { label: "B", value: 45 },
      { label: "C", value: 80 },
      { label: "D", value: 35 },
    ]
  }).meta({
    description: "Chart configuration",
  }),

  key_kpis: z.array(z.object({
    value: z.string().min(1).max(10).default("100").meta({ description: "Metric value" }),
    label: z.string().min(2).max(20).default("Label").meta({ description: "Metric label" }),
    description: z.string().max(100).default("").meta({ description: "Metric description" }),
  })).min(1).max(3).default([{ "value": "25%", "label": "Energy Efficiency", "description": "YoY Improvement" }, { "value": "100%", "label": "Renewable Energy", "description": "Target by 2030" }, { "value": "0", "label": "Incidents", "description": "Safety First" }]).meta({
    description: "Key metrics to display",
  }),

  logo_accent: z.object({
    __image_url__: z.string().url().default("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg").meta({
      description: "Image URL",
    }),
    __image_prompt__: z.string().min(10).max(100).default("red square logo geometric").meta({
      description: "Image generation prompt",
    }),
  }).default({
    __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    __image_prompt__: "red square logo geometric"
  }).meta({
    description: "Image with URL and prompt",
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
          <div style={{ position: 'absolute', left: '0%', top: '0%', width: '30%', height: '100%', zIndex: 0 }}>
            <div className="w-full h-full overflow-hidden" style={{ backgroundColor: 'var(--tertiary-accent-color, #E5E7EB)' }}>
              {data?.sidebar_bg?.__image_url__ && (
                <img
                  src={data.sidebar_bg.__image_url__}
                  alt={data.sidebar_bg?.__image_prompt__ || "Image"}
                  className="w-full h-full"
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>
          </div>

          <div style={{ position: 'absolute', left: '2%', top: '5%', width: '26%', height: '20%', zIndex: 10 }}>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--text-heading-color, #111827)', textAlign: 'left' }}>
              {data?.sidebar_title || "Innovation at Core"}
            </h2>
          </div>

          <div style={{ position: 'absolute', left: '2%', top: '15%', width: '26%', height: '60%', zIndex: 10 }}>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-body-color, #6B7280)' }}>
              {data?.sidebar_text || "Driving the future of technology through advanced manufacturing processes."}
            </p>
          </div>

          <div style={{ position: 'absolute', left: '35%', top: '5%', width: '60%', height: '15%', zIndex: 1 }}>
            <h1 className="text-5xl font-bold" style={{ color: 'var(--text-heading-color, #111827)', textAlign: 'left' }}>
              {data?.main_title || "Annual Sustainability Report"}
            </h1>
          </div>

          <div style={{ position: 'absolute', left: '35%', top: '25%', width: '60%', height: '45%', zIndex: 1 }}>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                {(data?.growth_chart?.type as string) === 'pie' ? (
                  <PieChart>
                    <Pie data={data?.growth_chart?.data || []} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={80} label>
                      {(data?.growth_chart?.data || []).map((_, i) => (
                        <Cell key={i} fill={['#9333ea', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'][i % 5]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                ) : (data?.growth_chart?.type as string) === 'line' ? (
                  <LineChart data={data?.growth_chart?.data || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="var(--primary-accent-color, #9333ea)" strokeWidth={2} />
                  </LineChart>
                ) : (
                  <BarChart data={data?.growth_chart?.data || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="var(--primary-accent-color, #9333ea)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ position: 'absolute', left: '35%', top: '75%', width: '60%', height: '20%', zIndex: 1 }}>
            <div className="grid grid-cols-3 gap-6">
              {(data?.key_kpis || []).map((metric, idx) => (
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

          <div style={{ position: 'absolute', left: '90%', top: '2%', width: '8%', height: '8%', zIndex: 5 }}>
            <div className="w-full h-full overflow-hidden" style={{ backgroundColor: 'var(--tertiary-accent-color, #E5E7EB)' }}>
              {data?.logo_accent?.__image_url__ && (
                <img
                  src={data.logo_accent.__image_url__}
                  alt={data.logo_accent?.__image_prompt__ || "Image"}
                  className="w-full h-full"
                  style={{ objectFit: 'contain' }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DynamicSlideLayout
