
var exp=require('express');
var dot=require('dotenv');
var mon=require('mongoose');
var bparser=require('body-parser');
bparserinit=bparser.urlencoded({extended:false});
var app=exp();
app.use(bparserinit);
 
mon.connect("mongodb://127.0.0.1:27017/local?directConnection=true&serverSelectionTimeoutMS=2000&appName=Exprerss2Mongo").then
(() => {console.log('Connected to the database ...')}).catch(
    ()=>{console.log("Unable to Connect.Check the URL.")}
)
/*
//Select the Database and store it reefrence as db.
var db=mon.connection.useDb('local');
 
//Display the name of selected database.
console.log(db.name);
 
//Return the list of all the collections in the database. Collection is method or a function to collect all the data.
var dbCollections=db.collection;         //Gives the total number of collection in the selected database.
console.log("Total# of collections : " + dbCollections.length);
 
for (i=0;i<db.collection.length;i++)
{
    console.log(db.collection[i]);
}
*/
//Define the structure of the Collection.
const userSchema={userId:String,password:String,emailid:String};
 
//Link the structure with the name of the actual collection in the database.
//Actual collection name is Users.
//model(<collectionName>,<schemaName or structureOfTheCollection>)
var UserData=mon.model('Users',userSchema);
 
function insertUsers(request,response)
{
    //Prepare the data to be into the collection.
    var udata=new UserData({'userId':request.body.uid,'password':request.body.password,'emailId':request.body.emailid})
 
    //Insert the data into the collection,then check if data insertion is successful.
    //Use save() function to insert the data.
    udata.save().then((data)=>{console.log("Inserted Successfuly...");
    response.send("Inserted Data successfully");
    }).catch((error)=>
    {
        console.log(error);
        response.send("Unable to insert the data")
    })
}
 
function getAllUsers(request,response)
{
    //Retrive all the records.If successfuly retrived,display it.Else error.
    UserData.find().then((data)=>{console.log(data);
        response.send(data)
    }).catch(
    (error)=>{console.log(error);response.send('Could not retrive Data');
})
}
function updateUserData(request, response) {
  const userId = request.body.userid;
  const updateData = {
      password: request.body.password,
      emailid: request.body.emailid
  };
 
  userData.findOneAndUpdate({ userid: userid }, updateData, { new: true })
      .then((updatedUser) => {
          if (updatedUser) {
              console.log("Update is successful");
              response.send("Updated Successfully");
          } else {
              console.log("User not found for update");
              response.send("User not found for update");
          }
      })
      .catch((error) => {
          console.log(error);
          response.send("Unable to update data");
      });
}
 
app.put('/updateUser', bparserinit, updateUserData);
 
 
function deleteUserData(request, response) {
  const userid = request.params.userid;
  userData.findOneAndRemove({ userid: userid })
      .then((removedUser) => {
          if (removedUser) {
              console.log("Deletion is successful");
              response.send("User Deleted Successfully");
          } else {
              console.log("User not found for deletion");
              response.send("User not found for deletion");
          }
      })
      .catch((error) => {
          console.log(error);
          response.send("Unable to delete user");
      });
}
app.delete('/deleteUser/:userid', deleteUserData);
 
app.listen(8010,function(error){
    if(error != undefined){
        console.log("this is error code");
        console.log(error.message);}
 
    else{
        console.log('Connect to port 8010.Waiting for the request.')
        console.log('On the browser , visit http://localhost:8010/')
    }
})
app.post('/insertUsers',bparserinit,insertUsers)
app.post('/getAllUsers',bparserinit,getAllUsers)
