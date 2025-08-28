export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  if (req.method === 'GET') {
    return res.status(200).json({ 
      message: 'Test API endpoint working',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      hasNodemailer: typeof require !== 'undefined' ? 'Node.js' : 'Edge Runtime'
    });
  }
  
  if (req.method === 'POST') {
    const body = req.body || {};
    return res.status(200).json({ 
      message: 'Test POST endpoint working',
      receivedData: body,
      timestamp: new Date().toISOString()
    });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
