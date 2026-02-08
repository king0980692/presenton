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

export const layoutId = "metrics-with-chart"
export const layoutName = "Metrics with Chart"
export const layoutDescription = "A slide showing key metrics on the left and a chart visualization on the right"

export const Schema = z.object({
  title: z.string().min(5).max(42).default("Performance Overview").meta({
    description: "Main heading text. Max 6 words",
  }),

  description: z.string().min(10).max(210).default("Our key performance indicators show consistent growth across all metrics.").meta({
    description: "Descriptive text. Max 30 words",
  }),

  metrics: z.array(z.object({
    value: z.string().min(1).max(10).default("100").meta({ description: "Metric value" }),
    label: z.string().min(2).max(20).default("Label").meta({ description: "Metric label" }),
    description: z.string().max(100).default("").meta({ description: "Metric description" }),
  })).min(1).max(3).default([{"value":"98%","label":"Uptime","description":"System reliability"},{"value":"2.5M","label":"Users","description":"Active monthly"},{"value":"150%","label":"Growth","description":"Year over year"}]).meta({
    description: "Key metrics to display",
  }),

  chart: z.object({
    type: z.enum(["bar","line","pie"]).default("bar"),
    data: z.array(z.object({
      label: z.string().min(1).max(20).default("A").meta({ description: "Data label" }),
      value: z.number().min(0).max(1000).default(50).meta({ description: "Data value" }),
    })).min(2).max(10).default([
      { label: "A", value: 60 },
      { label: "B", value: 45 },
      { label: "C", value: 80 },
      { label: "D", value: 35 },
    ]),
  }).default({}).meta({
    description: "Chart configuration",
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
        <div className="grid h-full" style={{ gridTemplateColumns: '45% 55%', gap: '0px' }}>
          {/* Left Column */}
          <div className="flex flex-col p-8 justify-center" style={{ backgroundColor: 'transparent' }}>
            <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--text-heading-color, #111827)' }}>
              {data?.title || "Performance Overview"}
            </h1>

            <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--text-body-color, #6B7280)' }}>
              {data?.description || "Our key performance indicators show consistent growth across all metrics."}
            </p>

            <div style={{ height: '30px' }}></div>

            <div className="grid grid-cols-3 gap-6">
              {(data?.metrics || []).map((metric, idx) => (
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

          {/* Right Column */}
          <div className="flex flex-col p-8 justify-center" style={{ backgroundColor: 'var(--secondary-accent-color, #F3F4F6)' }}>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                {data?.chart?.type === 'pie' ? (
                  <PieChart>
                    <Pie data={data?.chart?.data || []} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={80} label>
                      {(data?.chart?.data || []).map((_, i) => (
                        <Cell key={i} fill={['#9333ea', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'][i % 5]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                ) : data?.chart?.type === 'line' ? (
                  <LineChart data={data?.chart?.data || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="var(--primary-accent-color, #9333ea)" strokeWidth={2} />
                  </LineChart>
                ) : (
                  <BarChart data={data?.chart?.data || []}>
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
        </div>
      </div>
    </>
  )
}

export default DynamicSlideLayout
