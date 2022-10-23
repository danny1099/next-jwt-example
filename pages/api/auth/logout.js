import { serialize } from 'cookie';

export default function logoutHandler(req, res) {
  const { tokenId } = req.cookies;

  if (!tokenId) {
    return res.status(401).json('No se encontró ningún token de acceso');
  }

  //NOTE: Se define un token nuevo (con el mismo nombre) como nulo y tiempo de expiración en cero (0)
  res.setHeader(
    'Set-Cookie',
    serialize('tokenId', null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    })
  );

  return res.status(200).json('La sesión fue finalizada exitosamente');
}
