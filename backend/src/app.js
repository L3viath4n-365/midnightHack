import express from "express"
import cors from "cors"
/*
Would need to import routes
*/

const app = express();

app.use(cors({
    origin:["*"],
    credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Declare routes 
// example: app.use("/route", variable);

export default app;