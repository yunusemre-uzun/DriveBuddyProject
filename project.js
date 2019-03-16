const http = require('http'); 
var parser = require('./parser.js');
var User = require('./user.js')

const hostname = '127.0.0.1';
const port = 8000;

var usersList = [];

var datas = {
    NAME: 1,
    EMAIL: 3,
    SCORE: 5,
}

isIn = function(name){
    for(i=0;i<usersList.length;i++){
        if(usersList[i].getUserName() == name){
            return i;
        }
    }
    return -1;
}

const server = http.createServer((req, res) => {
    var parsed_input = parser.parseTheUrl(req.url);
    if(parsed_input == -1){ //errorneous url
        console.log("Fail");
        res.statusCode = 404;
        res.write("The field does not exist. Error no:404");
        res.end();  //ends the response
    }
    if(req.method == 'POST')
    {
        switch(parsed_input.length)
        {
            case 1: //if client post to names resources create a new instance
                //console.log(req.body);
                var tempName = usersList.length+1;
                var newUser = new User(tempName,[],0);
                usersList.push(newUser);
                res.statusCode = 201;
                res.write("New user created with name: " + String(tempName) + "\n");
                res.end();  //ends the response
                break;//if client post to emails resources create a new instance of related name
            case 3:
                var name = parsed_input[datas.NAME];  //get the name from the url
                var newEmail;
                var flag = isIn(name);
                //console.log(i);
                if(flag != -1) //if the user exists
                {
                    newEmail = usersList[flag].createNewEmail(name);
                    res.statusCode = 201;
                    res.write("New email, " + newEmail + " , created for user :" + name + "\n" );
                    res.end();  //ends the response

                }
                else{
                    res.statusCode = 404;
                    res.write("Name does not exist in resources.Error no:404 \n");
                    res.end();  //ends the response
                }
                break;
            case 5:
                var name = parsed_input[datas.NAME];  //get the name from the url
                var newScore;
                var flag = isIn(name);
                //console.log(i);
                if(flag != -1) //if the user exists
                {
                    newScore = usersList[flag].createNewScore(name);
                    res.statusCode = 201;
                    res.write("New score, " + newScore + " , incremented for user :" + name + "\n" );
                    res.end();  //ends the response

                }
                else{
                    res.statusCode = 404;
                    res.write("Name does not exist in resources.Error no:404 \n");
                    res.end();  //ends the response
                }
            default:
                res.write("Erroneous url for post action. \n");
                res.end();  //ends the response
                break;
        }

        
    }
    else if(req.method == 'GET'){
        var name = parsed_input[datas.NAME];
        var flag = isIn(name);
        switch(parsed_input.length){
            case 1:
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                var userNames = [];
                for(i=0;i<usersList.length;i++){
                    userNames.push(usersList[i].getUserName());
                }
                res.end(JSON.stringify({ 
                    names: userNames
                }));
            case 2:
                if(flag != -1) //if the user exists
                {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ 
                        names: usersList[flag].userName,
                        emails : usersList[flag].userEmail,
                        scores : usersList[flag].userScore,
                    }));

                }
                else{
                    res.statusCode = 404;
                    res.write("Name does not exist in resources.Error no:404 \n");
                    res.end();  //ends the response
                }
                break;
            case 3:
                if(flag != -1) //if the user exists
                {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.write("Email(s) for the user is/are: \n");
                    res.end(JSON.stringify({ 
                        emails : usersList[flag].userEmail,
                    }));

                }
                else{
                    res.statusCode = 404;
                    res.write("Name does not exist in resources.Error no:404 \n");
                    res.end();  //ends the response
                }
                break;
            case 6:
                if(flag != -1) //if the user exists
                {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.write("Score for the user is/are: \n");
                    res.end(JSON.stringify({ 
                        scores : usersList[flag].userScore,
                    }));

                }
                else{
                    res.statusCode = 404;
                    res.write("Name does not exist in resources.Error no:404 \n");
                    res.end();  //ends the response
                }
                break;
            default:
                res.write("Erroneous url for get action. \n");
                res.end();  //ends the response
                break;
        }
    }	
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
