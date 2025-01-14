import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path'; // comes from node
import { fileURLToPath } from 'url'
import { register } from './controllers/auth.js';
import  authRoutes  from './routers/auth.js'
import userRoutes from './routers/users.js'
import postRoutes from './routers/posts.js'
import { createPost } from './controllers/posts.js'
import { verifyToken } from './middleware/auth.js';

import User from './models/User.js';
import Post from './models/Post.js';
import { users,  posts } from './data/index.js'


// CONFIGURATION =======
// =========================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
// these are used because the type int our package.json is set to module

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


// FILE STOAGE =========== 
// =======================
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage })

// ROUTES WITH FILES  =========
//=============================
app.post('/auth/register', upload.single("picture"), register) 
app.post('/posts', verifyToken, upload.single("picture"), createPost)

// ROUTES   ===================
//=============================
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

// MONGOOSE SETUP =========
//=========================
const PORT = process.env.PORT || 6001;
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(' Mongodb is connected')
        app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))

        /* ADD DATA ONE TIME */
        // User.insertMany(users);
        // Post.insertMany(posts)
    })
    .catch((error) => console.log({ ' Mongodb connection error': error }))

// SERVER START MESSAGE  =========
//================================
  app.get('/', (req, res) => {
    res.send('Server is running!')
  })
 