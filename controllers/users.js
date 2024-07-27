const User=require("../models/user");

module.exports.renderSignupForm=(req, res)=>{
    res.render("users/signup.ejs");
};


module.exports.signup=async(req, res)=>{
    try{
        let{username, email, password}=req.body;
        const newUser=new User({email, username});
        const registeredUser=await User.register(newUser, password);
        req.login(registeredUser,(err)=>{
if(err){
    return next(err);
}
req.flash("success", "welcome" );
    res.redirect("listings");
        });
        
    
    }
   catch(e){
    req.flash("error", e.message);
    res.redirect("/signup");
   }
};

module.exports.renderLoginForm= (req, res)=>{
    res.render("users/login.ejs");
};

module.exports.login=async(req, res)=>{
    res.flash("success","welcome, you are logged in");
   let redirectUrl= req.locals.redirectUrl || "/listings";
    res.redirect(redierctUrl);
};
module.exports.logout=(req, res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","u are logged out");
        res.redirect("/listings");
});
}