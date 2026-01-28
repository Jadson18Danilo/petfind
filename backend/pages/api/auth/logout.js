const { clearAuthCookie } = require('../../../src/server/auth/jwt');
const { applyCors } = require('../../../src/server/http/cors');

export default async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  clearAuthCookie(res);
  return res.status(200).json({ message: 'Logged out' });
}
