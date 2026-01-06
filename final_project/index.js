const express = require('express');
const session = require('express-session');
const customer_routes = require('./router/auth_users_router').authenticated;
const gen_routes = require('./router/public_users_router').general;

const app = express();
app.use(express.json());

app.use(session({
    secret: 'dancing in the rain',
    name: 'sessionId',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 60000,
    }
}));

app.use('/', gen_routes);
app.use('/customer', customer_routes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));