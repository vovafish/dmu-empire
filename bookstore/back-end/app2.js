// 引入环境变量

require('dotenv').config();



const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('koa2-cors');



const app = new Koa();
const router = new Router();

const username = process.env.DBusername
const password = process.env.DBpassword
const dbName = process.env.DBname

// JWT secret
const JWT_SECRET =  process.env.JWT_SECRET;

const dbURI = `mongodb+srv://${username}:${password}@cluster0.adxcm2e.mongodb.net/${dbName}?retryWrites=true&w=majority`;


// User Schema
const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        phone_number: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('users', UserSchema);


// Register
router.post('/register', async (ctx, next) => {

    const { email, password, first_name, last_name, phone_number } = ctx.request.body;

    if (!email || !password || !first_name || !last_name) {
        ctx.status = 400;
        ctx.body = { message: 'All fields  are required' };
        return;
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        ctx.status = 400;
        ctx.body = { message: 'Email already exists' };
        return;
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        email, passwordHash, first_name, last_name, phone_number
    });

    await user.save();

    ctx.status = 201;
    ctx.body = { message: 'User registered successfully' };
});

// Login
router.post('/login', async (ctx, next) => {

    const { email, password } = ctx.request.body;
    if (!email || !password) {
        ctx.status = 400;
        ctx.body = { message: 'All fields (email, password, username, firstName, and lastName) are required' };
        return;
    }
    const user = await User.findOne({ email });

    if (!user) {
        ctx.status = 401;
        ctx.body = { message: 'Invalid email or password' };
        return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordMatch) {
        ctx.status = 401;
        ctx.body = { message: 'Invalid email or password' };
        return;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    ctx.status = 200;
    ctx.body = { message: 'Login successful', token };
});
app.use(cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
}));

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then((e) => {
        console.log('db, ', dbURI);
        console.log('Connected to MongoDB', e);
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message);
    });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('MongoDB connected successfully');

    const port = 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
