const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser'); // not needed in newest version of express
const mongoose = require('mongoose');

// Routes to handle request
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect('mongodb+srv://Khoi8:' +
     process.env.MONGO_ATLAS_PW + 
    '@api-shop-xpmw8.mongodb.net/API?retryWrites=true&w=majority', {
    useNewUrlParser: true, //this is so that we use the mongodb client to connect
    useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Prevent CORS errors
app.use((req, res, next) => {
    // star is everything but you can specify
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes); // filters by request with products
app.use('/orders', orderRoutes); // filters by request with orders

//error handling
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
        error: {
            message: error.message
        }
	});
});

module.exports = app;
