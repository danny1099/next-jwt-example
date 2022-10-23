import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default function handlerLogin(req, res) {
  const { email, password } = req.body;

  if (email === 'admin@local.com' && password === 'admin') {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
        email: 'admin@local.com',
        username: '@danny',
      },
      'secret'
    );

    //NOTE:como buena practica se devuelve el token en la cabecera de la respuesta
    res.setHeader(
      'Set-Cookie',
      serialize('token-id', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: '/',
      })
    );

    return res.json('Login succesfully');
  }

  return res.status(401).json({ error: 'invalid email or password' });
}
