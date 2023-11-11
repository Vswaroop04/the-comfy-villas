const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

export default async function main() {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
    });
    console.log('Connected to MongoDB Successfully');
  } catch (error) {
  
  }
}
