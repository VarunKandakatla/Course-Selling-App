const {Admin} = require('../Database/database');


function AuthenticationMiddleware(req,res,next){
    const username = req.headers.username;
    const password = req.headers.password;

    

    Admin.findOne({username : username, password: password}).then((admin)=>{
        // if admin exists - go ahead

        if(admin)
        {
            // Send Admin name or id
            req.admin = admin;
            next();
        }
        else{
            res.status(403).json({
                message : 'UnAuthorized Admin'
            })
        }
    })
}

module.exports = AuthenticationMiddleware;