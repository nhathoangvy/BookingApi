var passport = require('passport');

module.exports = (router) => {
  router.get('/', (req, res, next) => {
    res.render('index', {user : req.user });
  });

  router.get('/login', (req, res, next) => {
    res.render('login', { message: req.flash('loginMessage') });
  });

  router.get('/signup', (req, res) => {
    res.render('signup', { message: req.flash('signupMessage') });
  });

  router.get('/logout', (req, res) => {
    req.session.destroy(); /*logout()*/
    res.redirect('/');
  });

  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
  }));

  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
  }));

  router.get('/auth/twitter', passport.authenticate('twitter'));

  router.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/profile',
    failureRedirect: '/',
  }));

  router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/',
  }));
};
