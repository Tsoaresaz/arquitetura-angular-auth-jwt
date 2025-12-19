const PORT = Number(process.env['PORT']);
const JWT_SECRET = process.env['JWT_SECRET'];

if (!JWT_SECRET) throw new Error('JWT_SECRET não definida');

export const env = {
  port: Number.isFinite(PORT) ? PORT : 3000,
  jwtSecret: JWT_SECRET,
};
