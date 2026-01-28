const ALLOWED_ORIGIN = process.env.FRONTEND_URL || 'http://localhost:5423';

function applyCors(req, res) {
  const origin = req.headers.origin;
  const allowOrigin = origin && origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN;

  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return true;
  }

  return false;
}

module.exports = { applyCors };
