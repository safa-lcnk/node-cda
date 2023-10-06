import dotenv from "dotenv"

dotenv.config()

const { CORRECT_LOGIN, CORRECT_PASSWORD } = process.env

export default function login(req, res) {
  const { login, password } = req.body;

  if (login === CORRECT_LOGIN && password === CORRECT_PASSWORD) {
    req.session.user = {
      isLogged: true,
      username: login
    }

    res.redirect('/dashboard')
    return
  } else {
    res.redirect(`/?errorMessage=Les identifiants sont invalides !`)
  }
}

export function LogoutController(req, res) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send(`<h1>Erreur !</h1><p>${err.message}</p>`)
        return
      }
      res.redirect('/login')
    })
  }