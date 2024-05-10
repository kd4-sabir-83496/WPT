
const express=require('express');
const mysql=require('mysql2');

var app=express.Router();

const connectionString = {
    host: "localhost",
    port: 3306,
    database: "airbnb_db",
    user: "root",
    password: "manager"
 };


 app.post("/",(request,response)=>{
    var email=request.body.email;
    var password=request.body.password;
    var userid;
    var output={"status":"" ,"result":""};

    var connection = mysql.createConnection(connectionString);
    connection.connect();

    let queryText = 
    `select id from user where email='${email}' and password='${password}';`;
     

    console.log(queryText);
    connection.query(queryText, (err, result)=>{
                                                    response.setHeader("Content-Type", "application/json");
                                                    if(err==null)
                                                    {
                                                        userid=result[0].id;
                                                        //insert into reviews(userId,propertyId,review,rating,image) values(2,5,'nice property','5.5','image');
                                                        let queryText = 
                            `insert into reviews(userId,propertyId,review,rating,image) values(${userid},${request.body.propertyId},'${request.body.review}',${request.body.rating},'${request.body.image}');`;
                                                         
                                                    
                                                        console.log(queryText);
                                                        connection.query(queryText, (err, result)=>{
                                                                                                        response.setHeader("Content-Type", "application/json");
                                                                                                        if(err==null)
                                                                                                        {
                                                                                                            output.status="success";
                                                                                                            output.result=result;
                                                                                                            response.write(JSON.stringify(output));
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
