import express from "express"
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

import session from 'express-session';
app.use(session({
    secret: 'algum segredo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

import rotas from './routes/routes.js'
app.use(rotas);

app.listen(3000)