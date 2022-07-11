import jwt from 'jsonwebtoken';


export default async function isLoggedIn(req) {
    if (req.headers['authorization']) {
        const token = req.headers.authorization.split(' ')[1];
        const bool = jwt.verify(token, process.env.SECRET, (err, result) => {
            if (err) return false
            req.token = result
            return true
        })
        return bool
    } else {
        return false
    }
}