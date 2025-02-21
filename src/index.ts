import express from "express"
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
const app = express();
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/users',userRouter);
app.listen(3000,()=>{
    console.log('server up at 3000');
})