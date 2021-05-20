function secure(req, res, next) {
    if(req.session.user) {
        return next();
    }
    res.status(401).json("You must login NAO");
}

module.exports = secure;