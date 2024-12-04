import express from  'express';
import path from 'path';

import router from './routes/main';
import cors from 'cors';
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use('/api',router);


 


  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
  











app.listen(port, () => {console.log(`Server is running on port ${port}`);});
 




