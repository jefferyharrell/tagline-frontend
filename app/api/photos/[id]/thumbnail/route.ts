import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const backendUrl = process.env.BACKEND_API_URL;
  const apiKey = process.env.API_KEY;
  const photoId = params.id;

  if (!backendUrl || !apiKey) {
    return NextResponse.json(
      {
        detail: "Server misconfiguration: missing BACKEND_API_URL or API_KEY.",
      },
      { status: 500 },
    );
  }

  // Build backend thumbnail URL
  const url = `${backendUrl}/photos/${photoId}/thumbnail`;

  // Forward request to backend with API key
  const backendRes = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": apiKey,
      accept: "image/webp",
    },
  });

  if (!backendRes.ok) {
    // Forward backend error JSON
    let detail = "Failed to fetch thumbnail.";
    try {
      const err = await backendRes.json();
      detail = err.detail || detail;
    } catch {}
    return NextResponse.json({ detail }, { status: backendRes.status });
  }

  // Stream the image
  const imageBuffer = await backendRes.arrayBuffer();
  return new NextResponse(Buffer.from(imageBuffer), {
    status: 200,
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
