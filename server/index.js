const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;
require('./connection');

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hello World! This is a express server for Co-Work Space Booking App');
});

app.use('/api/auth', require('./routes/signinRoute'));
app.use('/api/auth', require('./routes/signupRoute'));
app.use('/api/profile', require('./routes/getProfileRoute'));
app.use('/api', require('./routes/roomRoute'));


app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));