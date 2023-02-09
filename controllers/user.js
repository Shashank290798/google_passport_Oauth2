const User = require('../models/user');

// Store user in database if new, else check if existing user
exports.checkUser = (req, res, next) => {
    const profile = req.user;
    User.findOne({ email: profile.emails[0].value }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            // create a new user
            const newUser = new User({
                email: profile.emails[0].value,
                name: profile.displayName,
                image: profile.photos[0].value
            });
            newUser.save((err) => {
                if (err) {
                    return next(err);
                }
                return res.redirect('/success');
            });
        }
         else {
            // existing user, redirect to success page
            return res.redirect('/success');
        }
    });
};



