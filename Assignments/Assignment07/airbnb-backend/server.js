const express=require('express');
const app=express();
const mysql=require('mysql2');
const cors=require('cors');
const routeregister=require('./route/register');
const routeproperty=require('./route/property');
const routecategory=require('./route/category');
const routelistprop=require('./route/listproperty');
const routesearchprop=require('./route/propertysearch');
const routebooking=require('./route/bookings');
const routereviews=require('./route/reviews');


const connectionString = {
    host: "localhost",
    port: 3306,
    database: "airbnb_db",
    user: "root",
    password: "manager"
 };

app.use(express.json());
app.use(cors());

app.use((request,response,next)=>{
 
    if(!request.url.includes("register"))
    {
    var message={msg:""};
    var email=request.body.email;
    var pass=request.body.password;

    var connection = mysql.createConnection(connectionString);
    connection.connect();

    var queryText=`select * from user where email='${email}' and password='${pass}'`;
    


    connection.query(queryText, (err, result)=>{
        response.setHeader("Content-Type", "application/json");
        if(err==null)
        {
            if(result.length!=0)
            {
                
                next();
            }
            else
            {
              message.msg="invalid login";
              response.write(JSON.stringify(message));
              response.end();
            }
        }
        else
        {
            response.write(JSON.stringify(err));
            connection.end();
            response.end();
        }
    });
}
    else
    {
        next();
    }
});


app.use("/register",routeregister);
app.use("/property",routeproperty);
app.use("/category",routecategory);
app.use("/listprop",routelistprop);
app.use("/propertysearch",routesearchprop);
app.use("/bookings",routebooking);
app.use("/reviews",routereviews);

app.listen(9999,()=>{console.log("server started listening")});