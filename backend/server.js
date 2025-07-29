require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const attendanceRoutes = require('./routes/attendanceRoutes');
const { seedEmployees } = require('./controllers/attendanceController');

const app = express();

connectDB().then(() => {
  console.log('Connected to MongoDB, seeding if necessary...');
  seedEmployees().then(() => {
    console.log('Seeding complete (if needed).');
  });
});

app.use(cors());
app.use(express.json());
app.use('/api/attendance', attendanceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});