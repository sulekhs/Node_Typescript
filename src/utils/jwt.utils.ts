import jwt from 'jsonwebtoken';
import config from 'config';


const publicKey = config.get<string>("publicKey");

const privateKey = config.get<string>("privateKey");

export function signJwt(object:Object, options?: jwt.SignOptions | undefined){
    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: 'RS256'
    })
}


export function verifyJwt(token: string){
    try {
        const decode = jwt.verify(token, publicKey)
    } catch (e: any) {
        return {
            valid: false,
            expired: e.message === 'Jwt Expired',
            decoded: null
        };
    }
}

