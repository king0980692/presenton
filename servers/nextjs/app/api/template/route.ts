import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const groupName = searchParams.get("group");

  if (!groupName) {
    return NextResponse.json({ error: "Missing group name" }, { status: 400 });
  }

  // 讀取預生成的靜態 JSON 文件
  const schemaPath = path.join(
    process.cwd(),
    "generated",
    "schemas",
    `${groupName}.json`
  );

  if (!fs.existsSync(schemaPath)) {
    return NextResponse.json(
      { error: `Template '${groupName}' not found` },
      { status: 404 }
    );
  }

  try {
    const schemaContent = fs.readFileSync(schemaPath, "utf-8");
    const schema = JSON.parse(schemaContent);
    return NextResponse.json(schema);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to read template schema" },
      { status: 500 }
    );
  }
}
