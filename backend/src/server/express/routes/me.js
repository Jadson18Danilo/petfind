const express = require('express');
const { ensureDatabase } = require('../../db');
const { initUserModel } = require('../../models/User');
const { getTokenFromRequest, verifyToken } = require('../../auth/jwt');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const payload = verifyToken(token);

    const sequelize = await ensureDatabase();
    const User = initUserModel(sequelize);

    const user = await User.findByPk(payload.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ id: user.id, name: user.name, email: user.email, telefone: user.telefone, cidade: user.cidade, estado: user.estado, avatar: user.avatar });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
});


// Atualizar perfil do usuário (aceita multipart/form-data para avatar)
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

async function ensureUploadDir() {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  await fs.promises.mkdir(uploadDir, { recursive: true });
  return uploadDir;
}

async function saveFile(file) {
  if (!file) return null;
  const uploadDir = await ensureUploadDir();
  const ext = path.extname(file.originalFilename || '') || '';
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
  const dest = path.join(uploadDir, filename);
  await fs.promises.rename(file.filepath, dest);
  return `/uploads/${filename}`;
}

router.put('/', async (req, res) => {
  try {
    const token = getTokenFromRequest(req);
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const payload = verifyToken(token);

    // parse multipart or json
    const contentType = req.headers['content-type'] || '';
    let fields = {};
    let avatarUrl = null;

    if (contentType.includes('multipart/form-data')) {
      const form = (typeof formidable === 'function' ? formidable : formidable.formidable)({ multiples: false, keepExtensions: true, uploadDir: await ensureUploadDir() });
      const parsed = await new Promise((resolve, reject) => {
        form.parse(req, (err, flds, files) => {
          if (err) return reject(err);
          resolve({ flds, files });
        });
      });

      fields = parsed.flds || {};
      const avatarFile = parsed.files?.avatar;
      if (avatarFile) avatarUrl = await saveFile(avatarFile);
    } else {
      fields = req.body || {};
    }

    const sequelize = await ensureDatabase();
    const User = initUserModel(sequelize);

    const user = await User.findByPk(payload.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.update({
      name: fields.name ?? user.name,
      email: fields.email ?? user.email,
      telefone: fields.telefone ?? user.telefone,
      cidade: fields.cidade ?? user.cidade,
      estado: fields.estado ?? user.estado,
      avatar: avatarUrl ?? user.avatar,
    });

    return res.json({ id: user.id, name: user.name, email: user.email, telefone: user.telefone, cidade: user.cidade, estado: user.estado, avatar: user.avatar });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
