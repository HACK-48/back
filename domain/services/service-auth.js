const magic = require('../../util/magic');
const enum_ = require('../../util/enum');
const ormUser = require('../orm/orm-user');
const jwt = require('jsonwebtoken');
require('../entities/entity-user');
const conn = require("../repositories/repository_mongo");

const SECRET = 'f3eQRLjWCn6iCG4QukU6IjCTYGot3IFw+nJB01b/128=';

exports.Login = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    await ormUser.GetByMail(req.body.mail).then((user) => {
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
                    token: token,
                    message: `Connexion réussie.`
                });
            } else {
                return res.status(400).send({
                    token: '',
                    message: "Le mail ou le mot de passe est invalide."
                });
            }
        }
    })

}

exports.Register = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    let user = new conn.db.connMongo.User();

    user.name = req.body.firstname,
    user.lastName = req.body.lastName,
    user.pseudo = req.body.pseudo,
    user.mail = req.body.mail,
    user.password = req.body.password
    user.sector = req.body.sector;

    user.setPassword(req.body.password);

    user.save((err, User) => {
      if (err) {
        return res.status(400).send({
          message: `Ajout d'un utilisateur échoué.`,
          error: err.message
        });
      }
      
      return res.status(201).send({
        message: "Utilisateur ajouté avec succès.",
      });
    });
}