import express from "express";
import morgan from "morgan";
const app = express();

app.get("/", (req, res) => {
  res.send("00028532853");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
// import  express  from "express";
// import "dotenv/config";
// import morgan from "morgan";
// import connectDB from "./config/db.js";
// import authRoute from "./routes/authRoute.js"
// import cors from "cors"; 
// import categoryRoutes from './routes/categoryRoutes.js'
// import productRoute from './routes/productRoute.js'


// connect database

// connectDB();

// rest object 
// const app = express();

// middlewares 
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(morgan('dev'));

//routes
// app.use('/api/v1/auth',authRoute);
// app.use('/api/v1/category',categoryRoutes);
// app.use('/api/v1/product',productRoute)
// app.use('/',(req,res)=>{
//     res.send("hi bro backend is still alive");
// })

// const PORT = process.env.PORT||8080;
// app.listen(PORT,()=>{
//     console.log(`server is running on ${PORT}`); 
// });

// export default app;    
