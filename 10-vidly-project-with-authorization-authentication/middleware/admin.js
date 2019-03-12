module.exports = function(req,res,next){
    //401 : unauthorized
    //403 : Forbidden

    if(!req.user.isAdmin) return res.status(403).send('Access Denied.');
    next();
}