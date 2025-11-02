import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const host = body.host;

		const resp = await fetch(`${process.env.API_ENDPOINT}/crawl`, {
			method: 'POST',
			body: JSON.stringify({ host }),
		})

		const respData = await resp.json();
		return NextResponse.json(respData);
	} catch (error) {
		console.error('[ERROR]: ', error);
		return new NextResponse('Error fetching results', { status: 500, statusText: error as string });
	}
}
