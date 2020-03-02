const express=require('express');
const app=express();
const PORT=process.env.PORT || 3000;

app.use(express.json());

app.use('/todos',require('./routes/todos'));

app.listen(PORT,()=>console.log('Jalan di port '+PORT));

