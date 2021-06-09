const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
// referencia al Modelo que vamos a autenticar
const { User } = require('./../models');

// local strategy - login con credenciales propias
passport.use(
  new LocalStrategy(
    {
      // por default passport espera un usaurio y una password
      // podemos reescribir las variables que espera passport
      usernameField: 'email',
      passwordField: 'password'
    },
    async function (email, password, done){
      try {
        const user = await User.findOne({where:{email}});
        // usuario existe pero password incorrecto
        if(!user.verifyPassword(password)){
          return done(null, false, { message: 'Invalid e-mail or password'})
        }
        return done(null, user);
      } catch (error) {
        // cuando el usuario no existe
        return done(null, false, {message: 'Invalid e-mail or password'})
      }
    }
  )
)

// serializar usuario
passport.serializeUser((user, callback) => {
  callback(null, user);
})
// deserializar usuario
passport.deserializeUser((user, callback) => {
  callback(null, user);
})

module.exports = passport;