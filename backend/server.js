const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

const connectDB = require('./config/database');
connectDB();

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});