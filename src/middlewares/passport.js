const passport = require('passport');
const LocalStrategy = require('passport-local');
const { User } = require('./../models');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async function (email, password, done){
      try {
        const user = await User.findOne({
          where:{
            email,
            isActive: 1 
          }
        });
        if(!user.verifyPassword(password)){
          return done(null, false, { message: 'Invalid e-mail or password'})
        }
        return done(null, user);
      } catch (error) {
        return done(null, false, {message: 'Invalid e-mail or password'})
      }
    }
  )
)

passport.serializeUser((user, callback) => {
  callback(null, user);
})

passport.deserializeUser((user, callback) => {
  callback(null, user);
})

module.exports = passport;