
//Import Expressjs
var expr = require('express');

//body-parser is required to retrive data sent through POST request
var bparser=require('body-parser');
//initalize the body-parser
bparserinit=bparser.urlencoded({extended:false});

//Initialize expressJS enviroment
var app = expr();

//
var users = [{ userId: 100, FirsrName: "Aymen", LastName: "Naqash" },
{ userId: 101, FirstName: "Chirag", LastName: "Rohilla" },
{ userId: 102, FirstName: "Sanghavai", LastName: "B" },
{ userId: 103, FirstName: "Shrilekha", LastName: "J"},
{ userId: 104, FirsrName: "Geethapriya", LastName: "N"},
{ userId: 105, FirsrName: "fname", LastName: "lname"},
{ userId: 106, FirsrName: "fname", LastName: "lname"},
{ userId: 107, FirsrName: "fname", LastName: "lname"},
{ userId: 108, FirsrName: "fname", LastName: "lname"}];

//post
function addNewUser(request,response){
    var userid=request.body.uid;
    var firstName=request.body.fname;
    var lastName=request.body.lname;
    var rval= users.push({userId:userid, FirstName: firstName, LastName: lastName});
    response.send("<b>User Added.  Total Users :  </b> " + rval);
}
app.post('/addUser', bparserinit, addNewUser)

function updateUser(request, response) {
    //Get the user id, first name and last name from the request body
    var userid = request.body.uid;
    var firstName = request.body.fname;
    var lastName = request.body.lname;
    //Find the user with the given id in the array
    var user = users.find(function(user) { 
        return user.userId == userid; //Return the condition for finding the user
    });
    //If the user exists, update their first name and last name and send a success message
    if (user) {
        user.FirstName = firstName;
        user.LastName = lastName;
        response.send("User with id " + userid + " updated successfully");
    }
    //Otherwise, send an error message
    else {
        response.send("No user with id " + userid + " found");
    }
}
app.post("/updateUser", bparserinit, updateUser);

function retriveUser(request, response) {
    var status=false;
    var userid=request.query.uid;
    var firstName=request.query.fname;function updateUser(request, response) {
    //Get the user id, first name and last name from the request body
    var userid = request.body.uid;
    var firstName = request.body.fname;
    var lastName = request.body.lname;
    //Find the user with the given id in the array
    var user = users.find(function(user) { //Use a regular function instead of an arrow function
        return user.userId == userid; //Return the condition for finding the user
    });
    //If the user exists, update their first name and last name and send a success message
    if (user) {
        user.FirstName = firstName;
        user.LastName = lastName;
        response.send("User with id " + userid + " updated successfully");
    }
    //Otherwise, send an error message
    else {
        response.send("No user with id " + userid + " found");
    }
}
//Register the function as a handler for the /updateUser route using POST method
app.post("/updateUser", bparserinit, updateUser);

    for(var user of users){
        if (userid==user.userId && firstName==user.FirstName){
            status=true;
            break;
        }
    }    
        if(status)
            response.send(user);
        else
            response.send("<b>No employee with Id </b>" + userid);
}
app.get("/getUser", retriveUser)

//function to get all users from the array
function getAll(request, response) {
//Send the users array as the response
    response.send(users);
}
app.get("/getAll", getAll)

function deleteUser(request, response) {
    //Get the user id from the query parameter
    var userid = request.query.uid;
    //Find the index of the user with the given id in the array
    var index = users.findIndex(function(user) {
        return user.userId == userid; //Return the condition for finding the index
    });
    //If the index is valid, remove the user from the array and send a success message
    if (index != -1) {
        users.splice(index, 1);
        response.send("User with id " + userid + " deleted successfully");
    }
    //Otherwise, send an error message
    else {
        response.send("No user with id " + userid + " found");
    }
}
app.get("/deleteUser", deleteUser);

//
var visitorCount = 0;

//request represents the HTTP request ; response expresses HTTTP response
function home(request, response) {
    var resp = "<html><body><b>Welcome to our Home Page...<br>";
    resp += "<a href=/welcome>Welcome !!! </a></body></html>";
    response.send(resp); //sends the response
}
app.get('/', home)

function welcome(request, response) {
    var today = new Date();
    visitorCount++;
    var resp = "<html><body><b>Today :" + today;
    resp += "<b><br><b>Visitor Count</b> :" + visitorCount;
    resp += "</body></html>"
    response.send(resp);
}
app.get('/Welcome', welcome);

function feedback() {
    console.log("Server started on port No.8600...");
    console.log("Open the broswer and visit http://localhost:8600/welcome");
}
app.listen(8600, feedback);