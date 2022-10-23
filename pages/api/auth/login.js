import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default function handlerLogin(req, res) {
  const { email, password } = req.body;
  const expireDate = (1 / 8) * 24 * 60 * 60 * 1000;

  if (email === 'admin@local.com' && password === 'admin') {
    const token = jwt.sign(
      {
        expiresIn: '3h',
        email: 'admin@local.com',
        username: '@danny',
      },
      'secret'
    );

    console.log(expireDate);
    //NOTE:como buena practica se devuelve el token en la cabecera de la respuesta
    res.setHeader(
      'Set-Cookie',
      serialize('tokenId', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: expireDate,
        path: '/',
      })
    );

    return res.json('Login succesfully');
  }

  return res.status(401).json({ error: 'invalid email or password' });
}
