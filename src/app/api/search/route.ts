import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Inside search");
  const request = await req.json();
  console.log("Request: ", request);


  const API_ENDPOINT = process.env.API_ENDPOINT;
  console.log("API_ENDPOINT: ", API_ENDPOINT);
  if (!API_ENDPOINT) {
    return new NextResponse("Error: API_ENDPOINT not set", { status: 500 });
  }

  try {
    const response = await fetch(API_ENDPOINT,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          SearchTerm: request.searchQuery,
        }),
      }
    );
    console.log("Response: ", response);
    if (!response.ok) {
      console.log("Error: ", response.statusText);
    }

    const body = await response.json();
    return new NextResponse(JSON.stringify(body), { status: 200 });
  } catch (error) {
    console.error("[ERROR]: ", error);
    return new NextResponse("Error fetching results", { status: 500, statusText: error as string });
  }
}
