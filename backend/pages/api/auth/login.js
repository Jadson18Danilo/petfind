const bcrypt = require('bcryptjs');
const { z } = require('zod');
const { ensureDatabase } = require('../../../src/server/db');
const { initUserModel } = require('../../../src/server/models/User');
const { signToken, setAuthCookie } = require('../../../src/server/auth/jwt');
const { applyCors } = require('../../../src/server/http/cors');

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = schema.parse(req.body);

    const sequelize = await ensureDatabase();
    const User = initUserModel(sequelize);

    const user = await User.findOne({ where: { email: data.email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = signToken({ id: user.id, email: user.email });
    setAuthCookie(res, token);

    return res.json({
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid input', details: err.errors });
    }
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}
