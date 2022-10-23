import { verify } from 'jsonwebtoken';

export default function profileHandler(req, res) {
  const { tokenId } = req.cookies;

  if (!tokenId) {
    return res.status(401).json('No se encontró ningún token de acceso');
  }

  try {
    const tokenVerified = verify(tokenId, 'secret');
    return res.status(200).json(tokenVerified);
  } catch (error) {
    return res.status(401).json('No se encontró ningún token de acceso');
  }
}
