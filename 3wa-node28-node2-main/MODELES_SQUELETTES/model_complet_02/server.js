import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import session from 'express-session';
import flash from "connect-flash";
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import { fileURLToPath } from 'url';

import route from './routes/routes.js';

// ==========
// App initialization
// ==========

dotenv.config();
const { 
  APP_HOSTNAME, 
  APP_PORT, 
  NODE_ENV, 
  SESSION_SECRET, 
  MONGO_STRING,
  MONGO_DB_NAME 
} = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set('view engine', 'pug');
app.locals.pretty = NODE_ENV !== 'production';

// ==========
// App middlewares
// ==========

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'Inscription',
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: `${MONGO_STRING}${MONGO_DB_NAME}` })
}));
app.use(express.urlencoded({ extended: false }));

app.use(flash());

app.use((req, res, next) => {
  res.locals.flash_success = req.flash("success");
  next();
});

app.use(express.json())

// ==========
// App routers
// ==========

app.use('/', route);

// ==========
// App start
// ==========

try {
  await mongoose.connect(`${MONGO_STRING}${MONGO_DB_NAME}`)
  console.log('✅ Connecté à la base MongoDB')
}
catch (err) {
  console.error('Erreur de connexion', err.message)
}

app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});
