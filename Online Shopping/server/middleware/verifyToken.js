import JWT from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers.token.split(' ')[1];
    try {
        if(token) {
            const user = JWT.verify(token, process.env.JWT_SECRET);
            req.user = user;
            next();
        } else {
            return res.status(401).json({ message: "You are not authenticated!" });
        }    
    } catch (error) {
        console.log(error);
        return res.status(403).json({message: "Token is not valid"});
    }
}

export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin)
            next();
        else res.status(403).json({message: "You are not authorized to do that"}); 
    });
}

export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin)
            next();
        else res.status(403).json({message: "You are not authorized to do that"}); 
    });
}