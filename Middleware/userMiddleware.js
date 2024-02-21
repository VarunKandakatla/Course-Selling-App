const {User} = require('../Database/database');

function userMiddleware(req,res,next)
{
    User.findOne({
        username : req.headers.username,
        password : req.headers.password
    })

    .then((user)=>{
        if(user)
        {
            // console.log(user);
            req.user = user;
            next();
        }
        else
        {
            res.status(403).json({
                message : "unAuthorised User!"
            })
        }
    })
}

module.exports = userMiddleware;