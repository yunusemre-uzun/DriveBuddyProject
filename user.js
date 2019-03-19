class User {
    constructor(userName,userEmail,userScore){
        this.userName = userName;    // a user can have only one name and it hast to be unique
        this.userEmail = userEmail ; // a user can have more than one email
        this.userScore = userScore ; // a user can have only one score
    };

    getUserName(){
        return this.userName;
    };

    changeUserName(newName){
        this.userName = newName;
        return 1;
    }

    deleteEmail(email){
        var newEmailList = [];
        var flag = false;
        for(i=0;i<this.userEmail.length;i++){
            if(this.userEmail[i]==email){
                flag = true;
                continue;
            }
            else{
                newEmailList.push(this.userEmail[i]);
            
            }
        }
        this.userEmail = newEmailList;
        return flag;
    }

    updateEmail(oldEmail,newEmail){
        var i;
        for(i=0;i<this.userEmail.length;i++){
            if(oldEmail == this.userEmail[i]){
                this.userEmail[i] = newEmail;
                return true;
            }
        }
        return false;
    }

    addNewEmail(newEmail){
        var i ;
        for(i=0;i<this.userEmail.length;i++){
            if(newEmail == userEmail[i]){
                return -1;
            }
        }
        userEmail.push(newEmail);
        return this.userEmail.length;
    };

    updateScore(newScore){
        this.userScore = newScore;
        return this.userScore;
    };
};

module.exports = User;