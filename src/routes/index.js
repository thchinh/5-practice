import authRoute from './authRoute.js';

function routes(app) {
  app.use('/auth', authRoute);

  app.get('/', (req, res) => {
    req.header;
    res.cookie('userName', 'chinh', {
      maxAge: 60000,
      httpOnly: true,
    });
    res.render('home');
  });
}

export default routes;
