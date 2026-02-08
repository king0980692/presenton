# Custom Layout Creation Guide

Create custom slide layouts with absolute positioning using 3 steps.

## Step 1: Write a JSON Layout Definition

Create a `.json` file in this directory (`servers/nextjs/template-definitions/`).

Each element uses `bounds: [x%, y%, w%, h%]` to position on a 1280x720 slide canvas.

```
bounds: [x%, y%, w%, h%]
         |    |    |    └─ height (percentage of slide height)
         |    |    └────── width  (percentage of slide width)
         |    └─────────── top    (percentage from top)
         └──────────────── left   (percentage from left)
```

### Minimal Example

```json
{
  "templateName": "custom",
  "layoutId": "my-layout",
  "layoutName": "My Custom Layout",
  "layoutDescription": "A short description of this layout.",

  "structure": {
    "type": "absolute",
    "elements": [
      { "type": "heading", "field": "title",    "bounds": [5, 5, 90, 10],  "align": "center", "zIndex": 1, "level": 1, "maxWords": 8 },
      { "type": "text",    "field": "subtitle", "bounds": [10, 18, 80, 8], "zIndex": 1, "maxWords": 20 }
    ]
  }
}
```

### Full Example (all element types)

```json
{
  "templateName": "custom",
  "layoutId": "dashboard",
  "layoutName": "Dashboard Layout",
  "layoutDescription": "Banner image, title, chart and table.",

  "structure": {
    "type": "absolute",
    "elements": [
      { "type": "image",   "field": "banner",   "bounds": [0, 0, 100, 30],  "fitMode": "cover", "zIndex": 0, "defaultPrompt": "Abstract gradient background" },
      { "type": "heading", "field": "title",    "bounds": [5, 6, 90, 10],   "align": "center",  "zIndex": 1, "level": 1, "maxWords": 10, "defaultValue": "Quarterly Report" },
      { "type": "text",    "field": "subtitle", "bounds": [15, 18, 70, 6],  "zIndex": 1, "maxWords": 20, "defaultValue": "Key metrics and performance data." },
      { "type": "chart",   "field": "chart",    "bounds": [3, 35, 46, 60],  "zIndex": 1, "chartTypes": ["bar", "line", "pie"], "defaultType": "bar" },
      { "type": "table",   "field": "data",     "bounds": [52, 35, 45, 60], "zIndex": 1, "maxRows": 5, "maxCols": 4 }
    ]
  },

  "style": { "fontFamily": "Inter", "backgroundColor": "#F8FAFC" }
}
```

### Available Element Types

| Type | Description | Extra Properties |
|------|-------------|-----------------|
| `heading` | Title / heading text | `level` (1-3), `align` (left/center/right), `maxWords`, `defaultValue` |
| `text` | Body / paragraph text | `maxWords`, `overflow` (shrink/truncate), `defaultValue` |
| `image` | Image element | `fitMode` (cover/contain/fill), `defaultPrompt` |
| `chart` | Chart visualization | `chartTypes` (array of bar/line/pie), `defaultType` |
| `table` | Data table | `maxRows`, `maxCols` |
| `bullets` | Bullet point list | `minItems`, `maxItems`, `withIcons` (boolean) |
| `icon` | Single icon | `defaultQuery` |

### Common Properties (all elements)

| Property | Required | Description |
|----------|----------|-------------|
| `type` | Yes | Element type (see table above) |
| `field` | Yes | Unique field name for this element |
| `bounds` | Yes | `[x%, y%, w%, h%]` position on slide |
| `zIndex` | No | Stacking order (default: 0). Higher = on top |

---

## Step 2: Generate TSX and Schemas

From `servers/nextjs/`:

```bash
# Generate the TSX layout component
npx tsx scripts/generate-template-from-json.ts template-definitions/my-layout.json

# Rebuild schemas (required for the import API to recognize the new layout)
npx tsx scripts/generate-schemas.ts
```

Output:
- TSX component: `presentation-templates/custom/{layoutId}Layout.tsx`
- Schema JSON: `generated/schemas/custom.json`

---

## Step 3: Test via Import API

Start the server, then send a POST request:

```python
import requests

resp = requests.post("http://localhost:11003/api/v1/ppt/presentation/import", json={
    "title": "My Presentation",
    "template": "custom",
    "language": "English",
    "slides": [
        {
            "layout_id": "custom:my-layout",
            "content": {
                "title": "Hello World",
                "subtitle": "Some description text here."
            }
        }
    ]
})

data = resp.json()
print(f"Edit URL: http://localhost:11001{data['edit_url']}")
```

The `layout_id` format is `{templateName}:{layoutId}`.

Content fields must match the `field` names in your JSON definition. Each type expects:

| Element Type | Content Format |
|-------------|----------------|
| `heading` / `text` | `"field_name": "string value"` |
| `image` | `"field_name": {"__image_url__": "https://...", "__image_prompt__": "description"}` |
| `chart` | `"field_name": {"type": "bar", "data": [{"label": "A", "value": 50}, ...]}` |
| `table` | `"field_name": {"headers": ["Col1", "Col2"], "rows": [["a", "b"], ...]}` |
| `bullets` | `"field_name": [{"title": "...", "description": "..."}, ...]` |
| `icon` | `"field_name": {"__icon_url__": "...", "__icon_query__": "search term"}` |

---

## Notes

- After generating new layouts, restart Next.js (or run `./start.sh` which clears the `.next-build` cache automatically).
- The `templateName` in the JSON should be `"custom"` unless you're creating a new template group.
- Multiple images are supported by using different `field` names (e.g. `"bg"`, `"logo"`, `"photo"`).
- Use `zIndex` to layer elements (e.g. background image at 0, text overlay at 10).
