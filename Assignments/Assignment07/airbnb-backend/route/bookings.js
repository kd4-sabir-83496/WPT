


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


    var connection = mysql.createConnection(connectionString);
    connection.connect();
    var propertyid=request.body.id;
    var email=request.body.email;
    var password=request.body.password;

    var rent;
    var userid;
    let query=`select rent from property where id=${propertyid} ;`;
    
    connection.query(query, (err, result)=>{
                                                if(err==null)
                                                {
                                                   
                                                   rent=result[0].rent;
                                                   rent=parseInt(request.body.totaldays)*rent;
                                                   console.log(rent);
                                                   
                                                   
                                                   let querytext=`select id from user where email='${email}' and password='${password}';`;
                                                   connection.query(querytext, (err, result)=>{
                                                    if(err==null)
                                                    {
                                                       
                                                      userid=result[0].id;
                                                      console.log(userid);

                                                       
                                                      let querytext=`insert into bookings(userId,propertyId,fromDate,toDate,total) values(${userid},${propertyid},'${request.body.fromDate}','${request.body.toDate}',${rent});`;
                                                      connection.query(querytext, (err, result)=>{
                                                       if(err==null)
                                                       {
                    
                                                        let querytext=`select * from bookings where userId=${userid};`;
                                                        connection.query(querytext, (err, result)=>{
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