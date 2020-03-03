require('dotenv').config();
const express=require('express');
const app=express();
const PORT=process.env.PORT || 3000;

app.use(express.json());

app.use('/',require('./routes/index'));
app.use('/todos',require('./routes/todos'));
app.use('/calendar',require('./routes/google-calendar'));

app.use(require('./middleware/errorHandler'));

app.listen(PORT,()=>console.log('Jalan di port '+PORT));

