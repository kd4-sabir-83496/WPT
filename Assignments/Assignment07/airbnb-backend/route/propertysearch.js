const express=require('express');
const app=express.Router();
const mysql=require('mysql2');




const connectionString = {
    host: "localhost",
    port: 3306,
    database: "airbnb_db",
    user: "root",
    password: "manager"
 };

 app.post("/price",(request,response)=>{


    var connection = mysql.createConnection(connectionString);
    connection.connect();
    var price=request.body.value;

    let queryText = 
        `select * from property where rent<${price}`;

    console.log(queryText);
    connection.query(queryText, (err, result)=>{
                                                    response.setHeader("Content-Type", "application/json");
                                                    if(err==null)
                                                    {
                                                        response.write(JSON.stringify(result));
                                                        connection.end();
                                                        response.end();
                                                    }
                                                    else
                                                    {
                                                        response.write(JSON.stringify(err));
                                                        connection.end();
                                                        response.end();
                                                    }
                                                });
})






app.post("/location",(request,response)=>{


    var connection = mysql.createConnection(connectionString);
    connection.connect();
    var location=request.body.location;

    let queryText = 
        `select * from property where address='${location}';`;

    console.log(queryText);
    connection.query(queryText, (err, result)=>{
                                                    response.setHeader("Content-Type", "application/json");
                                                    if(err==null)
                                                    {
                                                        response.write(JSON.stringify(result));
                                                        connection.end();
                                                        response.end();
                                                    }
                                                    else
                                                    {
                                                        response.write(JSON.stringify(err));
                                                        connection.end();
                                                        response.end();
                                                    }
                                                });
})







module.exports=app;