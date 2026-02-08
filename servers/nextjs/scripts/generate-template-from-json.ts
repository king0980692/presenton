/**
 * Template Generator Script
 *
 * Generates React TSX layout components from JSON definitions.
 *
 * Usage: npx tsx scripts/generate-template-from-json.ts <json-file-or-folder>
 *
 * Example:
 *   npx tsx scripts/generate-template-from-json.ts template-definitions/my-template.json
 *   npx tsx scripts/generate-template-from-json.ts template-definitions/
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// ============================================
// TYPE DEFINITIONS
// ============================================

interface ElementBase {
  type: string;
  field: string;
  style?: Record<string, string>;
  bounds?: [number, number, number, number];  // [x%, y%, w%, h%]
  zIndex?: number;
}

interface HeadingElement extends ElementBase {
  type: 'heading';
  level?: 1 | 2 | 3;
  maxWords?: number;
  defaultValue?: string;
  align?: 'left' | 'center' | 'right';
}

interface TextElement extends ElementBase {
  type: 'text';
  maxWords?: number;
  defaultValue?: string;
  overflow?: 'shrink' | 'truncate';
  styleRef?: string;
}

interface BulletsElement extends ElementBase {
  type: 'bullets';
  max?: number;
  withIcons?: boolean;
  numbered?: boolean;
  defaultValue?: Array<{ title: string; description: string }>;
}

interface ImageElement extends ElementBase {
  type: 'image';
  defaultUrl?: string;
  defaultPrompt?: string;
  fitMode?: 'cover' | 'contain' | 'fill';
}

interface MetricsElement extends ElementBase {
  type: 'metrics';
  max?: number;
  defaultValue?: Array<{ value: string; label: string; description?: string }>;
}

interface ChartElement extends ElementBase {
  type: 'chart';
  chartTypes?: Array<'bar' | 'line' | 'pie' | 'horizontalBar'>;
  defaultType?: string;
}

interface TableElement extends ElementBase {
  type: 'table';
  maxRows?: number;
  maxCols?: number;
}

interface TeamElement extends ElementBase {
  type: 'team';
  max?: number;
}

interface SpacerElement {
  type: 'spacer';
  height?: number;
  bounds?: [number, number, number, number];
  zIndex?: number;
}

type LayoutElement =
  | HeadingElement
  | TextElement
  | BulletsElement
  | ImageElement
  | MetricsElement
  | ChartElement
  | TableElement
  | TeamElement
  | SpacerElement;

interface ColumnDef {
  width?: string; // e.g., "1fr", "50%", "400px"
  elements: LayoutElement[];
  background?: string;
  padding?: string;
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end' | 'between';
}

interface LayoutDefinition {
  templateName: string;       // Folder name for the template
  layoutId: string;           // Unique ID for this layout
  layoutName: string;         // Human-readable name
  layoutDescription: string;  // Description for LLM
  themeRef?: string;          // Reference to a theme ID (e.g. "bold", "minimal")

  // Layout structure
  structure: {
    type: 'single' | 'two-column' | 'grid' | 'absolute';
    columns?: ColumnDef[];
    elements?: LayoutElement[];  // For absolute positioning mode
    rows?: number;
    gap?: number;
  };

  // Styling
  style?: {
    fontFamily?: string;
    backgroundColor?: string;
    padding?: string;
  };
}

// ============================================
// CODE GENERATORS
// ============================================

function generateSchemaField(element: LayoutElement): string {
  switch (element.type) {
    case 'heading':
      return `  ${element.field}: z.string().min(5).max(${(element.maxWords || 10) * 7}).default("${element.defaultValue || 'Heading Text'}").meta({
    description: "Main heading text. Max ${element.maxWords || 10} words",
  }),`;

    case 'text':
      return `  ${element.field}: z.string().min(10).max(${(element.maxWords || 50) * 7}).default("${element.defaultValue || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}").meta({
    description: "Descriptive text. Max ${element.maxWords || 50} words",
  }),`;

    case 'bullets':
      const bulletDefault = element.defaultValue || [
        { title: "Point One", description: "Description for the first point" },
        { title: "Point Two", description: "Description for the second point" },
        { title: "Point Three", description: "Description for the third point" },
      ];
      if (element.withIcons) {
        return `  ${element.field}: z.array(z.object({
    title: z.string().min(3).max(30).default("Point").meta({ description: "Bullet title" }),
    description: z.string().min(10).max(150).default("Description text").meta({ description: "Bullet description" }),
    icon: z.object({
      __icon_url__: z.string().default("").meta({ description: "Icon URL" }),
      __icon_query__: z.string().min(2).max(20).default("star").meta({ description: "Icon search query" }),
    }).optional(),
  })).min(1).max(${element.max || 5}).default(${JSON.stringify(bulletDefault)}).meta({
    description: "List of bullet points with icons",
  }),`;
      }
      return `  ${element.field}: z.array(z.object({
    title: z.string().min(3).max(30).default("Point").meta({ description: "Bullet title" }),
    description: z.string().min(10).max(150).default("Description text").meta({ description: "Bullet description" }),
  })).min(1).max(${element.max || 5}).default(${JSON.stringify(bulletDefault)}).meta({
    description: "List of bullet points",
  }),`;

    case 'image':
      return `  ${element.field}: z.object({
    __image_url__: z.string().url().default("${element.defaultUrl || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'}").meta({
      description: "Image URL",
    }),
    __image_prompt__: z.string().min(10).max(100).default("${element.defaultPrompt || 'Professional business image'}").meta({
      description: "Image generation prompt",
    }),
  }).default({}).meta({
    description: "Image with URL and prompt",
  }),`;

    case 'metrics':
      const metricsDefault = element.defaultValue || [
        { value: "100+", label: "Metric One", description: "Description" },
        { value: "50%", label: "Metric Two", description: "Description" },
        { value: "$1M", label: "Metric Three", description: "Description" },
      ];
      return `  ${element.field}: z.array(z.object({
    value: z.string().min(1).max(10).default("100").meta({ description: "Metric value" }),
    label: z.string().min(2).max(20).default("Label").meta({ description: "Metric label" }),
    description: z.string().max(100).default("").meta({ description: "Metric description" }),
  })).min(1).max(${element.max || 6}).default(${JSON.stringify(metricsDefault)}).meta({
    description: "Key metrics to display",
  }),`;

    case 'chart':
      return `  ${element.field}: z.object({
    type: z.enum(${JSON.stringify(element.chartTypes || ['bar', 'line', 'pie'])}).default("${element.defaultType || 'bar'}"),
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
  }),`;

    case 'table':
      return `  ${element.field}: z.object({
    headers: z.array(z.string()).min(2).max(${element.maxCols || 5}).default(["Column 1", "Column 2", "Column 3"]),
    rows: z.array(z.array(z.string())).min(1).max(${element.maxRows || 10}).default([
      ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
      ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"],
    ]),
  }).default({}).meta({
    description: "Table data with headers and rows",
  }),`;

    case 'team':
      return `  ${element.field}: z.array(z.object({
    name: z.string().min(2).max(30).default("Team Member").meta({ description: "Member name" }),
    role: z.string().min(2).max(30).default("Role").meta({ description: "Member role" }),
    image: z.object({
      __image_url__: z.string().url().default("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg").meta({ description: "Photo URL" }),
      __image_prompt__: z.string().default("Professional headshot").meta({ description: "Photo prompt" }),
    }).optional(),
  })).min(1).max(${element.max || 6}).default([
    { name: "John Doe", role: "CEO" },
    { name: "Jane Smith", role: "CTO" },
  ]).meta({
    description: "Team members",
  }),`;

    default:
      return '';
  }
}

function generateElementRenderer(element: LayoutElement, indent: string = ''): string {
  const i = indent;

  switch (element.type) {
    case 'heading':
      const Tag = `h${element.level || 1}`;
      const fontSize = element.level === 1 ? 'text-5xl' : element.level === 2 ? 'text-3xl' : 'text-xl';
      return `${i}<${Tag} className="${fontSize} font-bold mb-4" style={{ color: 'var(--text-heading-color, #111827)' }}>
${i}  {data?.${element.field} || "${element.defaultValue || 'Heading'}"}
${i}</${Tag}>`;

    case 'text':
      return `${i}<p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--text-body-color, #6B7280)' }}>
${i}  {data?.${element.field} || "${element.defaultValue || 'Description text goes here.'}"}
${i}</p>`;

    case 'bullets':
      if (element.withIcons) {
        return `${i}<div className="space-y-4">
${i}  {(data?.${element.field} || []).map((item, idx) => (
${i}    <div key={idx} className="flex items-start gap-3">
${i}      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--primary-accent-color, #9333ea)' }}>
${i}        <span className="text-white text-lg">✓</span>
${i}      </div>
${i}      <div>
${i}        <h4 className="font-semibold mb-1" style={{ color: 'var(--text-heading-color, #111827)' }}>{item.title}</h4>
${i}        <p className="text-sm" style={{ color: 'var(--text-body-color, #6B7280)' }}>{item.description}</p>
${i}      </div>
${i}    </div>
${i}  ))}
${i}</div>`;
      }
      if (element.numbered) {
        return `${i}<div className="space-y-4">
${i}  {(data?.${element.field} || []).map((item, idx) => (
${i}    <div key={idx} className="flex items-start gap-4">
${i}      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold" style={{ backgroundColor: 'var(--primary-accent-color, #9333ea)', color: 'white' }}>
${i}        {idx + 1}
${i}      </div>
${i}      <div>
${i}        <h4 className="font-semibold mb-1" style={{ color: 'var(--text-heading-color, #111827)' }}>{item.title}</h4>
${i}        <p className="text-sm" style={{ color: 'var(--text-body-color, #6B7280)' }}>{item.description}</p>
${i}      </div>
${i}    </div>
${i}  ))}
${i}</div>`;
      }
      return `${i}<div className="space-y-3">
${i}  {(data?.${element.field} || []).map((item, idx) => (
${i}    <div key={idx} className="flex items-start gap-2">
${i}      <span className="text-lg" style={{ color: 'var(--primary-accent-color, #9333ea)' }}>•</span>
${i}      <div>
${i}        <h4 className="font-semibold" style={{ color: 'var(--text-heading-color, #111827)' }}>{item.title}</h4>
${i}        <p className="text-sm" style={{ color: 'var(--text-body-color, #6B7280)' }}>{item.description}</p>
${i}      </div>
${i}    </div>
${i}  ))}
${i}</div>`;

    case 'image':
      return `${i}<div className="w-full h-full rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--tertiary-accent-color, #E5E7EB)' }}>
${i}  {data?.${element.field}?.__image_url__ && (
${i}    <img
${i}      src={data.${element.field}.__image_url__}
${i}      alt={data.${element.field}?.__image_prompt__ || "Image"}
${i}      className="w-full h-full object-cover"
${i}    />
${i}  )}
${i}</div>`;

    case 'metrics':
      return `${i}<div className="grid grid-cols-3 gap-6">
${i}  {(data?.${element.field} || []).map((metric, idx) => (
${i}    <div key={idx} className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--secondary-accent-color, #F3F4F6)' }}>
${i}      <div className="text-4xl font-bold mb-2" style={{ color: 'var(--primary-accent-color, #9333ea)' }}>
${i}        {metric.value}
${i}      </div>
${i}      <div className="font-semibold mb-1" style={{ color: 'var(--text-heading-color, #111827)' }}>
${i}        {metric.label}
${i}      </div>
${i}      {metric.description && (
${i}        <div className="text-sm" style={{ color: 'var(--text-body-color, #6B7280)' }}>
${i}          {metric.description}
${i}        </div>
${i}      )}
${i}    </div>
${i}  ))}
${i}</div>`;

    case 'chart':
      return `${i}<div className="w-full h-64">
${i}  <ResponsiveContainer width="100%" height="100%">
${i}    {data?.${element.field}?.type === 'pie' ? (
${i}      <PieChart>
${i}        <Pie data={data?.${element.field}?.data || []} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={80} label>
${i}          {(data?.${element.field}?.data || []).map((_, i) => (
${i}            <Cell key={i} fill={['#9333ea', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'][i % 5]} />
${i}          ))}
${i}        </Pie>
${i}        <Tooltip />
${i}        <Legend />
${i}      </PieChart>
${i}    ) : data?.${element.field}?.type === 'line' ? (
${i}      <LineChart data={data?.${element.field}?.data || []}>
${i}        <CartesianGrid strokeDasharray="3 3" />
${i}        <XAxis dataKey="label" />
${i}        <YAxis />
${i}        <Tooltip />
${i}        <Line type="monotone" dataKey="value" stroke="var(--primary-accent-color, #9333ea)" strokeWidth={2} />
${i}      </LineChart>
${i}    ) : (
${i}      <BarChart data={data?.${element.field}?.data || []}>
${i}        <CartesianGrid strokeDasharray="3 3" />
${i}        <XAxis dataKey="label" />
${i}        <YAxis />
${i}        <Tooltip />
${i}        <Bar dataKey="value" fill="var(--primary-accent-color, #9333ea)" radius={[4, 4, 0, 0]} />
${i}      </BarChart>
${i}    )}
${i}  </ResponsiveContainer>
${i}</div>`;

    case 'table':
      return `${i}<div className="overflow-hidden rounded-lg border" style={{ borderColor: 'var(--tertiary-accent-color, #E5E7EB)' }}>
${i}  <table className="w-full">
${i}    <thead>
${i}      <tr style={{ backgroundColor: 'var(--secondary-accent-color, #F3F4F6)' }}>
${i}        {(data?.${element.field}?.headers || []).map((h, i) => (
${i}          <th key={i} className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-heading-color, #111827)' }}>{h}</th>
${i}        ))}
${i}      </tr>
${i}    </thead>
${i}    <tbody>
${i}      {(data?.${element.field}?.rows || []).map((row, i) => (
${i}        <tr key={i} className="border-t" style={{ borderColor: 'var(--tertiary-accent-color, #E5E7EB)' }}>
${i}          {row.map((cell, j) => (
${i}            <td key={j} className="px-4 py-3" style={{ color: 'var(--text-body-color, #6B7280)' }}>{cell}</td>
${i}          ))}
${i}        </tr>
${i}      ))}
${i}    </tbody>
${i}  </table>
${i}</div>`;

    case 'team':
      return `${i}<div className="grid grid-cols-3 gap-6">
${i}  {(data?.${element.field} || []).map((member, idx) => (
${i}    <div key={idx} className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--secondary-accent-color, #F3F4F6)' }}>
${i}      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--tertiary-accent-color, #E5E7EB)' }}>
${i}        {member.image?.__image_url__ && (
${i}          <img src={member.image.__image_url__} alt={member.name} className="w-full h-full object-cover" />
${i}        )}
${i}      </div>
${i}      <div className="font-bold" style={{ color: 'var(--text-heading-color, #111827)' }}>{member.name}</div>
${i}      <div className="text-sm" style={{ color: 'var(--text-body-color, #6B7280)' }}>{member.role}</div>
${i}    </div>
${i}  ))}
${i}</div>`;

    case 'spacer':
      return `${i}<div style={{ height: '${element.height || 20}px' }}></div>`;

    default:
      return '';
  }
}

// ============================================
// ABSOLUTE POSITIONING HELPERS
// ============================================

function boundsToStyleString(bounds: [number, number, number, number], zIndex?: number): string {
  const [x, y, w, h] = bounds;
  let style = `position: 'absolute', left: '${x}%', top: '${y}%', width: '${w}%', height: '${h}%'`;
  if (zIndex !== undefined) {
    style += `, zIndex: ${zIndex}`;
  }
  return style;
}

function generateAbsoluteElementRenderer(element: LayoutElement, indent: string): string {
  const i = indent;
  const bounds = (element as any).bounds as [number, number, number, number] | undefined;
  const zIndex = (element as any).zIndex as number | undefined;

  if (!bounds) {
    // Fall back to flow-based rendering if no bounds
    return generateElementRenderer(element, indent);
  }

  const posStyle = boundsToStyleString(bounds, zIndex);

  switch (element.type) {
    case 'heading': {
      const Tag = `h${element.level || 1}`;
      const fontSize = element.level === 1 ? 'text-5xl' : element.level === 2 ? 'text-3xl' : 'text-xl';
      const align = element.align || 'left';
      return `${i}<div style={{ ${posStyle} }}>
${i}  <${Tag} className="${fontSize} font-bold" style={{ color: 'var(--text-heading-color, #111827)', textAlign: '${align}' }}>
${i}    {data?.${element.field} || "${element.defaultValue || 'Heading'}"}
${i}  </${Tag}>
${i}</div>`;
    }

    case 'text': {
      const overflow = element.overflow;
      let overflowClass = '';
      let overflowStyle = '';
      if (overflow === 'truncate') {
        overflowClass = ' truncate overflow-hidden';
      } else if (overflow === 'shrink') {
        overflowStyle = `, fontSize: 'clamp(12px, 2vw, 18px)'`;
      }
      return `${i}<div style={{ ${posStyle} }}>
${i}  <p className="text-lg leading-relaxed${overflowClass}" style={{ color: 'var(--text-body-color, #6B7280)'${overflowStyle} }}>
${i}    {data?.${element.field} || "${element.defaultValue || 'Description text goes here.'}"}
${i}  </p>
${i}</div>`;
    }

    case 'image': {
      const fitMode = element.fitMode || 'cover';
      return `${i}<div style={{ ${posStyle} }}>
${i}  <div className="w-full h-full overflow-hidden" style={{ backgroundColor: 'var(--tertiary-accent-color, #E5E7EB)' }}>
${i}    {data?.${element.field}?.__image_url__ && (
${i}      <img
${i}        src={data.${element.field}.__image_url__}
${i}        alt={data.${element.field}?.__image_prompt__ || "Image"}
${i}        className="w-full h-full"
${i}        style={{ objectFit: '${fitMode}' }}
${i}      />
${i}    )}
${i}  </div>
${i}</div>`;
    }

    case 'bullets':
      return `${i}<div style={{ ${posStyle} }}>
${generateElementRenderer(element, i + '  ')}
${i}</div>`;

    case 'metrics':
      return `${i}<div style={{ ${posStyle} }}>
${generateElementRenderer(element, i + '  ')}
${i}</div>`;

    case 'chart':
      return `${i}<div style={{ ${posStyle} }}>
${generateElementRenderer(element, i + '  ')}
${i}</div>`;

    case 'table':
      return `${i}<div style={{ ${posStyle} }}>
${generateElementRenderer(element, i + '  ')}
${i}</div>`;

    case 'team':
      return `${i}<div style={{ ${posStyle} }}>
${generateElementRenderer(element, i + '  ')}
${i}</div>`;

    case 'spacer':
      return '';

    default:
      return '';
  }
}

function generateAbsoluteContent(elements: LayoutElement[], indent: string): string {
  return elements
    .map(el => generateAbsoluteElementRenderer(el, indent))
    .filter(Boolean)
    .join('\n\n');
}

function generateColumnContent(column: ColumnDef, indent: string): string {
  return column.elements
    .filter(el => el.type !== 'spacer' || true)
    .map(el => generateElementRenderer(el, indent))
    .join('\n\n');
}

function hasChartElement(def: LayoutDefinition): boolean {
  const inColumns = def.structure.columns?.some(col =>
    col.elements.some(el => el.type === 'chart')
  ) || false;
  const inElements = def.structure.elements?.some(el => el.type === 'chart') || false;
  return inColumns || inElements;
}

function generateTSXFile(def: LayoutDefinition): string {
  const hasChart = hasChartElement(def);

  // Generate schema fields from columns (flow layouts) or elements (absolute layout)
  let allElements: LayoutElement[] = [];
  if (def.structure.type === 'absolute' && def.structure.elements) {
    allElements = def.structure.elements;
  } else if (def.structure.columns) {
    allElements = def.structure.columns.flatMap(col => col.elements);
  }

  const schemaFields = allElements
    .filter(el => el.type !== 'spacer')
    .map(el => generateSchemaField(el as LayoutElement))
    .filter(Boolean)
    .join('\n\n') || '';

  // Generate layout content
  let layoutContent = '';

  if (def.structure.type === 'absolute') {
    const elements = def.structure.elements || [];
    layoutContent = `
        <div className="relative w-full h-full">
${generateAbsoluteContent(elements, '          ')}
        </div>`;
  } else if (def.structure.type === 'single') {
    const col = def.structure.columns?.[0];
    if (col) {
      layoutContent = `
        <div className="flex flex-col h-full p-12 ${col.justify ? `justify-${col.justify}` : ''} ${col.align ? `items-${col.align}` : ''}">
${generateColumnContent(col, '          ')}
        </div>`;
    }
  } else if (def.structure.type === 'two-column') {
    const [left, right] = def.structure.columns || [];
    const leftWidth = left?.width || '1fr';
    const rightWidth = right?.width || '1fr';

    layoutContent = `
        <div className="grid h-full" style={{ gridTemplateColumns: '${leftWidth} ${rightWidth}', gap: '${def.structure.gap || 0}px' }}>
          {/* Left Column */}
          <div className="flex flex-col p-8 ${left?.justify ? `justify-${left.justify}` : ''}" style={{ backgroundColor: '${left?.background || 'transparent'}' }}>
${generateColumnContent(left || { elements: [] }, '            ')}
          </div>

          {/* Right Column */}
          <div className="flex flex-col p-8 ${right?.justify ? `justify-${right.justify}` : ''}" style={{ backgroundColor: '${right?.background || 'transparent'}' }}>
${generateColumnContent(right || { elements: [] }, '            ')}
          </div>
        </div>`;
  }

  // Generate complete TSX file
  return `import React from 'react'
import * as z from 'zod'
${hasChart ? `import {
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
} from 'recharts'` : ''}

export const layoutId = "${def.layoutId}"
export const layoutName = "${def.layoutName}"
export const layoutDescription = "${def.layoutDescription}"

export const Schema = z.object({
${schemaFields}
})

type SlideData = z.infer<typeof Schema>

interface SlideLayoutProps {
  data?: Partial<SlideData>
}

const DynamicSlideLayout: React.FC<SlideLayoutProps> = ({ data }) => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=${(def.style?.fontFamily || 'Inter').replace(' ', '+')}:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div
        className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
        style={{
          fontFamily: "var(--heading-font-family, ${def.style?.fontFamily || 'Inter'})",
          backgroundColor: 'var(--card-background-color, ${def.style?.backgroundColor || '#FFFFFF'})',
        }}
      >${layoutContent}
      </div>
    </>
  )
}

export default DynamicSlideLayout
`;
}

// ============================================
// MAIN
// ============================================

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: npx tsx scripts/generate-template-from-json.ts <json-file-or-folder>');
    console.log('');
    console.log('Example:');
    console.log('  npx tsx scripts/generate-template-from-json.ts template-definitions/my-layout.json');
    console.log('  npx tsx scripts/generate-template-from-json.ts template-definitions/');
    process.exit(1);
  }

  const inputPath = path.resolve(rootDir, args[0]);

  let jsonFiles: string[] = [];

  if (fs.statSync(inputPath).isDirectory()) {
    jsonFiles = fs.readdirSync(inputPath)
      .filter(f => f.endsWith('.json'))
      .map(f => path.join(inputPath, f));
  } else {
    jsonFiles = [inputPath];
  }

  console.log(`Found ${jsonFiles.length} JSON definition(s)\n`);

  for (const jsonFile of jsonFiles) {
    try {
      console.log(`Processing: ${path.basename(jsonFile)}`);

      const content = fs.readFileSync(jsonFile, 'utf-8');
      const def: LayoutDefinition = JSON.parse(content);

      // Validate required fields
      if (!def.templateName || !def.layoutId || !def.layoutName) {
        console.error(`  ✗ Missing required fields (templateName, layoutId, layoutName)`);
        continue;
      }

      // Generate TSX content
      const tsxContent = generateTSXFile(def);

      // Ensure template directory exists
      const templateDir = path.join(rootDir, 'presentation-templates', def.templateName);
      fs.mkdirSync(templateDir, { recursive: true });

      // Create settings.json if it doesn't exist
      const settingsPath = path.join(templateDir, 'settings.json');
      if (!fs.existsSync(settingsPath)) {
        fs.writeFileSync(settingsPath, JSON.stringify({
          description: `${def.templateName} presentation layouts`,
          ordered: false,
          default: false
        }, null, 2));
        console.log(`  ✓ Created settings.json`);
      }

      // Write TSX file
      const fileName = `${def.layoutId.replace(/[^a-zA-Z0-9-]/g, '-')}Layout.tsx`;
      const outputPath = path.join(templateDir, fileName);
      fs.writeFileSync(outputPath, tsxContent);

      console.log(`  ✓ Generated: ${outputPath}`);
      console.log(`    Layout ID: ${def.templateName}:${def.layoutId}`);

    } catch (error) {
      console.error(`  ✗ Error: ${error}`);
    }
  }

  console.log('\n✅ Generation complete!');
  console.log('\nNext steps:');
  console.log('  1. Run: npx tsx scripts/generate-schemas.ts');
  console.log('  2. Restart your server');
}

main().catch(console.error);
