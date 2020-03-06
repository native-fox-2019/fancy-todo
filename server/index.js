require('dotenv').config();
const express=require('express');
const path=require('path');
const cors=require('cors');
const app=express();
const PORT=process.env.PORT || 3000;

app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.use('/',require('./routes/index'))
app.use('/api',require('./routes/auth'));
app.use('/todos',require('./routes/todos'));
app.use('/calendar',require('./routes/google-calendar'));

app.use(require('./middleware/errorHandler'));

app.listen(PORT,()=>console.log('Jalan di port '+PORT));

