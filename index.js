// require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const i18nextMiddleware = require('i18next-http-middleware');
const i18n = require('./src/locales/i18next');
const mongooseErrorMiddleware = require('./src/middleware/mongooseErrorMiddleware');
const errorHandlerMiddleware = require('./src/middleware/errorHandlerMiddleware');



const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(i18nextMiddleware.handle(i18n));
app.use(mongooseErrorMiddleware);
app.use(errorHandlerMiddleware);



const routes = require('./src/routes');
app.use(express.json());
app.use(cookieParser());


require('./src/database');


app.use(routes);

// console.log('Current NODE_ENV:', process.env.NODE_ENV);


app.use('*', (req, res) => {
    res.status(404).json('mauvise routes');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

