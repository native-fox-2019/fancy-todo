require('dotenv').config()
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

const TodoRouter = require('./routes/todoRouter')
const UserRouter = require('./routes/userRouter')
const ApiRouter = require('./routes/apiRouter')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
 
app.use('postgres://iltexzasidizyy:3b38f53b6483aec2dc99f7d8208eab0fd4bbf2487f797d73faf08c2b1e39b13c@ec2-18-213-176-229.compute-1.amazonaws.com:5432/d7vp6bgtkdc9vq', TodoRouter)
app.use('postgres://iltexzasidizyy:3b38f53b6483aec2dc99f7d8208eab0fd4bbf2487f797d73faf08c2b1e39b13c@ec2-18-213-176-229.compute-1.amazonaws.com:5432/d7vp6bgtkdc9vq/user', UserRouter)
app.use('postgres://iltexzasidizyy:3b38f53b6483aec2dc99f7d8208eab0fd4bbf2487f797d73faf08c2b1e39b13c@ec2-18-213-176-229.compute-1.amazonaws.com:5432/d7vp6bgtkdc9vq/api', ApiRouter)

app.listen(port,()=>console.log(`listening on post ${port}`))