const { ensureDatabase } = require('../../../src/server/db');
const { initPetModel } = require('../../../src/server/models/Pet');
const { initMatchModel } = require('../../../src/server/models/Match');
const { getTokenFromRequest, verifyToken } = require('../../../src/server/auth/jwt');
const { Op } = require('sequelize');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const payload = verifyToken(token);
    const sequelize = await ensureDatabase();

    const Pet = initPetModel(sequelize);
    const Match = initMatchModel(sequelize);

    const myPets = await Pet.findAll({ where: { ownerId: payload.id } });
    const petIds = myPets.map(p => p.id);

    if (petIds.length === 0) {
      return res.json([]);
    }

    const matches = await Match.findAll({
      where: {
        [Op.or]: [
          { petAId: { [Op.in]: petIds } },
          { petBId: { [Op.in]: petIds } },
        ],
      },
      order: [['createdAt', 'DESC']],
    });

    return res.json(matches);
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
