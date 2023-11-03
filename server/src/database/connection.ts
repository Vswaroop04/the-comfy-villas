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
    console.log('Initial connection failed, retrying in 10 seconds...', error);

    // Wait for 10 seconds and then try to reconnect
    setTimeout(async () => {
      try {
        await mongoose.connect(process.env.MONGO, {
          useNewUrlParser: true,
        });
        console.log('Connected to MongoDB Successfully on second attempt');
      } catch (secondError) {
        console.log('Failed to connect on second attempt:', secondError);
      }
    }, 10000);
  }
}
