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
        var post_data = '';
        req.on('data', function (data) {
            post_data += data;
        });
        req.on('end', function () {
            switch(parsed_input.length)
            {
                case 1: //if client post to names resources create a new instance
                    //console.log(req.body);
                    var tempName;
                    if(post_data == ''){
                        tempName = usersList.length+1;
                    }
                    else{
                        tempName = post_data.substr(0,post_data.indexOf('\n'));
                        //console.log(tempName);
                        for(i=0;i<usersList.length;i++){
                            if(usersList[i] == tempName){
                                res.statusCode = 409;
                                res.write("Name already exists.Error no:409 \n");
                                res.end();  //ends the response
                            }
                        }
                    }
                    var newUser = new User(tempName,[],0);
                    usersList.push(newUser);
                    res.statusCode = 201;
                    res.write("New user created with name: " + String(tempName) + "\n");
                    res.end();  //ends the response
                    break;//if client post to emails resources create a new instance of related name
                case 3:
                    var name = parsed_input[datas.NAME];  //get the name from the url
                    var tempEmail;
                    var flag = isIn(name);
                    var user = usersList[flag];
                    //console.log(i);
                    if(flag != -1) //if the user exists
                    {
                        if(post_data == ''){
                            tempEmail = usersList.length+1;
                            user.addNewEmail(tempEmail);
                        }
                        else{
                            tempEmail = post_data.substr(0,post_data.indexOf('\n'));
                            console.log(tempEmail);
                            var j = user.addNewEmail(tempEmail);
                            if(j == -1){
                                res.statusCode = 409;
                                res.write("Email already exists.Error no:409 \n");
                                res.end();  //ends the response
                            }
                        }
                        res.statusCode = 201;
                        res.write("New email, " + tempEmail + " , created for user :" + name + "\n" );
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
                    var user = usersList[flag];
                    if(flag != -1) //if the user exists
                    {
                        if(post_data == ''){
                            newScore = usersList.length+1;
                        }
                        else{
                            newScore = post_data.substr(0,post_data.indexOf('\n'));
                            //console.log(tempEmail);
                        }
                        user.updateScore(newScore);
                        res.statusCode = 201;
                        res.write("New score, " + newScore + " , is for user :" + name + "\n" );
                        res.end();  //ends the response
    
                    }
                    else{
                        res.statusCode = 404;
                        res.write("Name does not exist in resources.Error no:404 \n");
                        res.end();  //ends the response
                    }
                    break;
                default:
                    res.write("Erroneous url for post action. \n");
                    res.end();  //ends the response
                    break;
            }
        });
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
                break;
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
                    res.write("Score for the user is: \n");
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
    else if(req.method == 'DELETE'){
        var name = parsed_input[datas.NAME];
        var flag = isIn(name);
        if(flag != -1){
            switch(parsed_input.length){
                case 2:
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/html');
                    var newUserList = [];
                    for(i=0;i<usersList.length;i++){
                        if(i==flag){
                            continue;
                        }
                        else{
                            newUserList.push(usersList[i]);
                        }
                    }
                    usersList = newUserList;
                    res.write(name + " is deleted successfully. \n");
                    res.end();  //ends the response
                    break;
                case 4:
                    var email = parsed_input[datas.EMAIL];
                    if(usersList[flag].deleteEmail(email)){
                        res.statusCode = 200
                        res.write(email + " is deleted successfully for user name:" + name + ". \n");
                        res.end();  //ends the response
                    }
                    else{
                        res.statusCode = 404
                        res.write(email + " can not be found for user name :" + name + ". \n");
                        res.end();  //ends the response
                    }
                    break;
                default:
                    res.write("Erroneous url for delete action. \n");
                    res.end();  //ends the response
                    break;
            }
        }
        else{
            res.statusCode = 404
            res.write("User with username :" + name + " can not be found. \n");
            res.end();  //ends the response
        }
        
    }
    else if(req.method == 'PUT'){
        var put_data = '';
        req.on('data', function (data) {
            put_data += data;
        });
        req.on('end', function () {
            switch(parsed_input.length)
            {
                case 2: //if user tries to change name
                    //console.log(req.body);
                    var name = parsed_input[datas.NAME];
                    var flag = isIn(name);
                    var newName = put_data;
                    //console.log(put_data);
                    var user = usersList[flag];
                    if(flag != -1){
                        //newName = put_data.substr(0,put_data.indexOf('\n'));
                        //console.log(tempName);
                        for(i=0;i<usersList.length;i++){
                            if(usersList[i] == newName){
                                res.statusCode = 409;
                                res.write("Name already exists.Error no:409 \n");
                                res.end();  //ends the response
                            }
                        }
                        user.changeUserName(newName);
                        res.statusCode = 200;
                        res.write("Name changed. \n");
                        res.end();  //ends the response
                    }
                    else{
                        res.statusCode = 404
                        res.write("User can not be found for user name :" + name + ". \n");
                        res.end();  //ends the response
                    }
                    break;
                case 4: //if user tries to change email
                    //console.log(req.body);
                    var name = parsed_input[datas.NAME];
                    var email = parsed_input[datas.NAME]
                    var flag = isIn(name);
                    var newEmail = put_data;
                    if(flag != -1){
                        //newEmail = put_data.substr(0,put_data.indexOf('\n'));
                        //console.log(tempName);
                        if(usersList[i].updateEmail(email,newEmail)){
                            res.statusCode = 200;
                            res.write("Email changed. \n");
                            res.end();
                        }
                        else{
                            res.statusCode = 204;
                            res.write("Email can not be found.Error no:204 \n");
                            res.end();
                        }
                    }
                    else{
                        res.statusCode = 404
                        res.write("User can not be found for user name :" + name + ". \n");
                        res.end();  //ends the response
                    }
                    break;
                case 6: //if user tries to change email
                //console.log(req.body);
                var name = parsed_input[datas.NAME];
                var flag = isIn(name);
                var newName;
                if(flag != -1){
                    newScore = put_data.substr(0,put_data.indexOf('\n'));
                    //console.log(tempName);
                    if(usersList[i].updateScore(newScore)){
                        res.statusCode = 200;
                        res.write("Score changed. \n");
                        res.end();
                    }
                }
                else{
                    res.statusCode = 404
                    res.write("User can not be found for user name :" + name + ". \n");
                    res.end();  //ends the response
                } 
                break;   
                default:
                    res.write("Erroneous url for put action. \n");
                    res.end();  //ends the response
                    break;
            }
        });
    }	
    else{
        res.statusCode = 404
        res.write("Invalid action. \n");
        res.end();  //ends the response
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
