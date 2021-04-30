const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('JWT has not  been created');
            } else {
                resolve(token);
            }


        });

    });

}

module.exports = {
    generarJWT,
}