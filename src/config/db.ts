import * as mongoose from 'mongoose';
import CONFIG from './config';

mongoose.set('useCreateIndex', true);


console.log("====++++++++++++++++++++=================================================================",CONFIG.DB_HOST);

// Connecting to the database

export default (async () => {
  try {
  await mongoose.connect(
      CONFIG.DB_HOST,
      { useNewUrlParser: true }
    );
    // listen for requests
  } catch (err) {
    console.log(`${err} Could not Connect to the Database. Exiting Now...`);
    process.exit();
  }
})();
