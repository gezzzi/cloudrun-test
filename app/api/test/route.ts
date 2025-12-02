import { NextResponse } from "next/server";

const CLOUDRUN_API_URL = process.env.CLOUDRUN_API_URL;

export async function GET() {
  if (!CLOUDRUN_API_URL) {
    return NextResponse.json(
      { error: "Cloud Run の URL が設定されていません" },
      { status: 500 }
    );
  }

  const endpoint = `${CLOUDRUN_API_URL.replace(/\/$/, "")}/test`;

  try {
    const res = await fetch(endpoint, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Cloud Run へのリクエストが失敗しました (${res.status})` },
        { status: 502 }
      );
    }

    const body = await res.text();
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Cloud Run へのリクエストでエラーが発生しました" },
      { status: 502 }
    );
  }
}
