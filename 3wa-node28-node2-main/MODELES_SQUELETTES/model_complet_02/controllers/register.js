import dotenv from "dotenv"

dotenv.config()

export async function RegisterController(req, res) {
    const { lastname, firstname, email, password, password_confirm } = req.body
    const user = await User.findOne({ email : email });

	if (!String(lastname).trim() ||  !String(firstname).trim()) {
        res.redirect(`/?errorMessage= Identifiant manquant !`)
	} 
    else if (!(/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/).test(String(email))) {
		res.redirect(`/?errorMessage= Adresse mail incorrect !`)
	} 
    else if(password !== password_confirm) {
        res.redirect(`/?errorMessage= Mot de passe pas identique !`)
    }
    else if (user) {
        res.redirect(`/?errorMessage= Adresse mail déjà utilisé`) 
    }
    req.flash('success', 'Opération quelconque correctement effectuée !');
    res.redirect('/dashboard')
  }
  