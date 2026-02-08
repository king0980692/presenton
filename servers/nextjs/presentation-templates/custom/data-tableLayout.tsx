import React from 'react'
import * as z from 'zod'


export const layoutId = "data-table"
export const layoutName = "Data Table Slide"
export const layoutDescription = "A single column slide with title, description, and a data table"

export const Schema = z.object({
  title: z.string().min(5).max(42).default("Comparison Data").meta({
    description: "Main heading text. Max 6 words",
  }),

  description: z.string().min(10).max(210).default("A detailed comparison of key features and metrics across different options.").meta({
    description: "Descriptive text. Max 30 words",
  }),

  data: z.object({
    headers: z.array(z.string()).min(2).max(4).default(["Column 1", "Column 2", "Column 3"]),
    rows: z.array(z.array(z.string())).min(1).max(6).default([
      ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
      ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"],
    ]),
  }).default({}).meta({
    description: "Table data with headers and rows",
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
        <div className="flex flex-col h-full p-12  ">
          <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--text-heading-color, #111827)' }}>
            {data?.title || "Comparison Data"}
          </h1>

          <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--text-body-color, #6B7280)' }}>
            {data?.description || "A detailed comparison of key features and metrics across different options."}
          </p>

          <div style={{ height: '30px' }}></div>

          <div className="overflow-hidden rounded-lg border" style={{ borderColor: 'var(--tertiary-accent-color, #E5E7EB)' }}>
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: 'var(--secondary-accent-color, #F3F4F6)' }}>
                  {(data?.data?.headers || []).map((h, i) => (
                    <th key={i} className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-heading-color, #111827)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(data?.data?.rows || []).map((row, i) => (
                  <tr key={i} className="border-t" style={{ borderColor: 'var(--tertiary-accent-color, #E5E7EB)' }}>
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-3" style={{ color: 'var(--text-body-color, #6B7280)' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default DynamicSlideLayout
