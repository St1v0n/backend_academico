import { loginUser } from './auth.service.js';

export async function login(req, res) {
  try {
    const { correo, password } = req.body;

    const result = await loginUser(correo, password);

    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      token: result.token,
      user: result.user
    });

  } catch (error) {

    res.status(401).json({
      success: false,
      message: error.message
    });

  }
}

export async function logout(
  req,
  res
) {

  res.json({
    success: true,
    message: 'Logout exitoso'
  });

}