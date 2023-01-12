const magic = require('../../util/magic');
const enum_ = require('../../util/enum');
const ormUser = require('../orm/orm-user');
const jwt = require('jsonwebtoken');

const SECRET = 'f3eQRLjWCn6iCG4QukU6IjCTYGot3IFw+nJB01b/128=';

exports.Login = async (req, res) => {
    await ormUser.GetByMail(req.body.Mail).then((user) => {
        if (user === null) {
            return res.status(400).send({
                message: "Utilisateur introuvable."
            });
        }
        else {
            const token = jwt.sign({
                id: user.id,
                username: user.username
            }, SECRET, { expiresIn: '3 hours' })

            if (user.validPassword(req.body.password)) {
                return res.status(201).send({
                    message: `Connexion réussie. token: ${token}`
                });
            } else {
                return res.status(400).send({
                    message: "Le mail ou le mot de passe est invalide."
                });
            }
        }
    })

}

exports.Register = (req, res, next) => {
    let user = new User();

    user.name = req.body.name,
    user.lastName = req.body.lastName,
    user.pseudo = req.body.pseudo,
    user.mail = req.body.mail,
    user.password = req.body.password

    user.setPassword(req.body.password);

    user.save((err, User) => {
        if (err) {
            return res.status(400).send({
                message: "Ajout d'un utilisateur échoué."
            });
        }
        else {
            return res.status(201).send({
                message: "Utilisateur ajouté avec succès."
            })
        }
    });
}