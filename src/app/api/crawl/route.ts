import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		console.log('Inside crawl');
		const body = await req.json();
		console.log('Request Body: ', body);
		let host = body.host;

		if (!host.startsWith('http://') && !host.startsWith('https://')) {
			host = 'https://' + host;
		}

		console.log('Full URL being sent to crawl endpoint: ', host);

		const resp = await fetch(`${process.env.API_ENDPOINT}/crawl`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ host }),
		})

		if (!resp.ok) {
			console.log('Error: ', resp.statusText);
		}

		const respData = await resp.json();

		console.log('Response Data: ', respData);
		return NextResponse.json(respData);
	} catch (error) {
		console.error('[ERROR]: ', error);
		return new NextResponse('Error fetching results', { status: 500, statusText: error as string });
	}
}
