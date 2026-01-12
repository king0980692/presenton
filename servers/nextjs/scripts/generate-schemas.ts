/**
 * 預生成 Template Schema JSON 文件
 *
 * 這個腳本會掃描 presentation-templates/ 目錄，
 * 提取每個 layout 的 Zod Schema 並轉換為 JSON Schema，
 * 最後輸出到 generated/schemas/ 目錄。
 *
 * 使用方式: npx tsx scripts/generate-schemas.ts
 */

import * as z from 'zod';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

interface TemplateSetting {
  description: string;
  ordered: boolean;
  default?: boolean;
}

interface SlideSchema {
  id: string;
  name: string;
  description: string;
  json_schema: object;
}

interface TemplateOutput {
  name: string;
  ordered: boolean;
  slides: SlideSchema[];
}

async function generateSchemas() {
  const templatesDir = path.join(rootDir, 'presentation-templates');
  const outputDir = path.join(rootDir, 'generated', 'schemas');

  // 確保輸出目錄存在
  fs.mkdirSync(outputDir, { recursive: true });

  // 獲取所有模板目錄（排除文件）
  const templates = fs.readdirSync(templatesDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  console.log(`Found ${templates.length} templates: ${templates.join(', ')}`);

  for (const templateId of templates) {
    const templateDir = path.join(templatesDir, templateId);

    // 獲取所有 .tsx 文件（排除非 layout 文件）
    const files = fs.readdirSync(templateDir)
      .filter(f => f.endsWith('.tsx') && !f.startsWith('.'));

    // 讀取 settings.json
    let settings: TemplateSetting = {
      ordered: false,
      description: `${templateId} presentation layouts`,
      default: false
    };
    const settingsPath = path.join(templateDir, 'settings.json');
    if (fs.existsSync(settingsPath)) {
      try {
        settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
      } catch (e) {
        console.warn(`  Warning: Failed to parse settings.json for ${templateId}`);
      }
    }

    console.log(`\nProcessing template: ${templateId} (${files.length} layouts)`);

    const slides: SlideSchema[] = [];

    for (const file of files) {
      try {
        // 動態導入 layout 文件
        const modulePath = path.join(templateDir, file);
        const module = await import(modulePath);

        // 檢查是否有 Schema export
        if (!module.Schema) {
          console.log(`  Skipping ${file}: no Schema export`);
          continue;
        }

        // 使用 Zod 內建的 toJSONSchema 轉換
        const jsonSchema = z.toJSONSchema(module.Schema, {
          override: (ctx) => {
            // 移除 default 值，讓 LLM 生成內容
            delete ctx.jsonSchema.default;
          }
        });

        // 提取 layout 元數據
        const layoutId = module.layoutId || file.replace('.tsx', '').replace(/Layout$/, '').toLowerCase();
        const layoutName = module.layoutName || file.replace('.tsx', '').replace(/Layout$/, '');
        const layoutDescription = module.layoutDescription || '';

        // 構建 slide schema
        const slideSchema: SlideSchema = {
          id: `${templateId}:${layoutId}`,
          name: layoutName,
          description: layoutDescription,
          json_schema: jsonSchema
        };

        slides.push(slideSchema);
        console.log(`  ✓ ${file} -> ${slideSchema.id}`);

      } catch (error) {
        console.error(`  ✗ Error processing ${file}:`, error);
      }
    }

    // 輸出 JSON 文件
    const output: TemplateOutput = {
      name: templateId,
      ordered: settings.ordered,
      slides
    };

    const outputPath = path.join(outputDir, `${templateId}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`  Saved: ${outputPath} (${slides.length} slides)`);
  }

  console.log('\n✅ Schema generation complete!');
}

// 執行
generateSchemas().catch(console.error);
