



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

 app.post("/",(request,response)=>{
    var firstName = request.body.firstName;
    var lastName = request.body.lastName;
    var email = request.body.email;
    var password=request.body.password;
    var isDeleted=request.body.isDeleted;
    var phoneNumber=request.body.phoneNumber;

    var connection = mysql.createConnection(connectionString);
    connection.connect();

    let queryText = 
        `insert into user(firstName,lastName,email,password,phoneNumber,isDeleted) values('${firstName}','${lastName}','${email}','${password}','${phoneNumber}',${isDeleted})`;

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