//Node.js has a built-in module called HTTP, which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP).
const http = require('http'); //includes a module
var parser = require('./parser.js'); //includes a user defined module
var url = require('url');

const hostname = '127.0.0.1';
const port = 8000;

var users = [];

class User {
    constructor(userID,userName,userEmail,userScore){
        this.userID = userID;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userScore = userScore;
    }
}

const server = http.createServer((req, res) => { //req is the url written by the client
    /*  
    this line or the next two line can be used to indicate status code
    res.writeHead(200, {'Content-Type': 'text/html'}); 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    */
    var state = parser.parseTheUrl(req.url);
    if(state == -1){ 
        //errorneous url 
        console.log("fail");
        res.statusCode = 404;
        res.write("The field does not exist.");
        res.end();  //ends the response
    }
    /*
    state 1 : POST with username, hence create new name, code 201
    state 2 :
    */
    if(state[0] == 1 && req.method == 'POST')
    {
        var tempName = users.length;
        var newUser = new User(tempName,tempName,0,0);
        users.push(newUser);
        res.statusCode = 201;
        res.write("New user created with ID,name,email,score: " + String(tempName) + "," + String(tempName) + ", 0, 0\n");
        res.end();  //ends the response
    }
    else if(state[0] == 2){
        var flag = false;
        switch(req.method){
            case 'GET':
                for(i=0;i<users.length;i++){ //iterate over the user list
                    if(users[i].userName == state[1]){ //if the user is created before
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ 
                            names: users[i].userName,
                            emails : users[i].userEmail,
                            scores : users[i].userScore,
                        }));
                        flag = true;
                        break;
                    }
                }
                if(flag)
                    break;
                res.statusCode = 404;
                res.write("User does not exist.\n");
                res.end();
                break;
            case 'PUT':

            case 'DELETE':

            default:
                break;
        }
    }
    //res.end();  //ends the response
	
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
