//imports
var exp=require('express');
var dot=require('dotenv');
var mon=require('mongoose');
//
var bparser = require('body-parser')    
bparserInit = bparser.urlencoded({extended:false});
app.use(bparserinit);
//
var app = exp() //initializing expressJS
//
//connect to DB
mon.connect("mongodb://127.0.0.1:27017/local?directConnection=true&serverSelectionTimeoutMS=2000&appName='ExpressToMongo'").then(
    ()=>{console.log("connected to Database...")}).catch(
        ()=>{console.log("unable to connect, check the URL...")})

//Define structure of the collection.
const userSchema = {userId: String, password: String, emailId: String};

//link the structure with actual colection in database.
//actual collection name is Users.
//model(<collectionName>,<schemaName or structureOfTheCollection>)
var UserData = mon.model('Users',userSchema);

app.put('updateUser',bparserInit,updateUser);

function addNewUser(request,response){
    //prepare the data to be inserted into the collection
var udata = new UserData({'userId': request.body.uid, 'password': request.body.password,'emailId': request.body.emailId})

//insert data into collection. then check if data insertion is successful.
//use 'save' function for inserting the data.
udata.save().then((data)=>{console.log("inserted successfully...");
response.send("Inserted data successfully")}).
catch((error)=>
{
    console.log(error);
    response.send("unable to insert the data!")
})
}
app.post('/addUser',bparserInit,addNewUser);

function getAllUsers(request,response){
    //retrive all the records, if successfully retrived, Else error
UserData.find().then((data)=>{console.log(data)
    response.send(data);
}).catch(
    (error)=>{
        console.log(error);
        response.send("couldn't retrive data")
        }
)
}
app.post('/allUsers',bparserInit,getAllUsers);

///////////////////////////////////////////
app.listen(8010, function(error){
    if(error!=undefined)
    {
        console.log(error.message)
    }    
    else
    {
        console.log('connected to port 8010. waiting for request.')
        console.log('On the browser and visit http:localhost:8010/')
    }
})
