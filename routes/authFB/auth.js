var passport = require('passport');
module.exports = (router) => {
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.get('/auth/facebook/callback',  passport.authenticate('facebook', {
      successRedirect: '/user',
      failureRedirect: '/',
    }));
  };
