import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // OPTIONS 요청 처리 (CORS preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // 환경변수에서 백엔드 URL 가져오기
    const BACKEND_URL = process.env.BACKEND_URL;

    if (!BACKEND_URL) {
      throw new Error('BACKEND_URL environment variable is not set');
    }

    // 요청 경로에서 /api/proxy 제거
    const path = req.url?.replace('/api/proxy', '') || '';
    const targetUrl = `${BACKEND_URL}${path}`;

    console.log(`Proxying ${req.method} request`);

    // 백엔드로 요청 전달
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({
      message: 'Proxy server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
