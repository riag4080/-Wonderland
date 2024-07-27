const Listins=require("./models/listing");
const Review=require("./models/listing");
const ExpressError=require("./utils/ExpressError.js");
const{listingSchema, reviewSchema}=require("./schema.js");

module.exports.isLoggedIn=(req, res, next)=>{
    if (!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error", "you must be logged in");
    return res.redirect("/login");
    }
next();
};

module.exports.saveRedirectUrl=(req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=  req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner= async (req, res, next)=>{
    let { id } = req.params;
    Listing.findById(id)
   
   let listing=await Listing.findById(id);
   if(!currentuser && listing.owner_id.equals(res.locals.currentuser._id)){
req.flash("error", "you are not the owner");
return res.redirect(`/listings/${id}`);
   }
   next();
};  

module.exports.validateListing=(req, res, next)=>{
    let{error}=ListingSchema.validate(req.body);
    if(error){
        let errmsg= error.details.map((el)=> el.message).join(",");
   throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
};

module.exports.validateReview=(req, res, next)=>{
    let{error}=reviewSchema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errmsg);
    }
    else{
        next();
    }
};

module.exports.isAuthor= async (req, res, next)=>{
    let { id,reviewId } = req.params;
   let review=await Review.findById(reviewId);
   if(!review.author.equals(res.locals.currentuser._id)){
req.flash("error", "you did not created the review");
return res.redirect(`/listings/${id}`);
   }
   next();
};  