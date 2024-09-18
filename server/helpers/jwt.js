const jwt = require('jsonwebtoken');


const generarJWT = (uid, name) =>{

    return new Promise((resolve, reject)  => {
        const payload = {uid, name};

        jwt.sign(payload , "Masisa2024", {
            expiresIn:'2h'
        }, (err, token)=>{

            if (err) {
                console.log(err)
                reject('No se pudo generar el tokens');
            }

            resolve( token )

        })

    }) 

}

module.exports = {
    generarJWT
};