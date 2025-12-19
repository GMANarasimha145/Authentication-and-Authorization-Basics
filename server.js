require('dotenv').config();
const express = require('express');
const { connectDB } = require('./database/db'); // if it is {connectDB}, then we can call function directly // if it is connectDB, we have to call connectDB.connectDB(), because connectDB here is a variable that represent contents of db.js file
const authRoutes = require('./routes/auth-routes');
const userRoutes = require('./routes/user-routes');
const adminRoutes = require('./routes/admin-routes');
const imageRoutes = require('./routes/image-routes');
const deployTestRoutes = require('./routes/deploy-test');


const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/deploytest', deployTestRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});