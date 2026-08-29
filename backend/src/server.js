import app from "./app.js";
/**
 * If want to add env files
 * import { config } from "dotenv";
 * config();
 */

/**
 * The port can be changed. I just like to use 8000
 */
const port = 8000;

/**
 * '0.0.0.0' just makes coonnections on all available network interaces. But
 * can change to your specific network.
 */
app.listen(port, '0.0.0.0',()=>{
    console.log(`Server is running on PORT ${port}`)
})