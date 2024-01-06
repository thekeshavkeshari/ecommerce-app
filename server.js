import  express  from "express";
import "dotenv/config";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js"
import cors from "cors"; 

// connect database

connectDB();

// rest object 
const app = express();

// middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

//routes

app.use('/api/v1/auth',authRoute);

//rest api 

// app.post('/',(req,res)=>{
//     console.log(req.body);
//     console.log("first try");
//     res.send({
//         ...req.body,
//         message:"welcome to ecommerce app"
//     });
// });


const PORT = process.env.PORT||8080;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`); 
});