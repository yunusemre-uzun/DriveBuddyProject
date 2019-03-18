class User {
    constructor(userName,userEmail,userScore){
        this.userName = userName;    // a user can have only one name and it hast to be unique
        this.userEmail = userEmail ; // a user can have more than one email
        this.userScore = userScore ; // a user can have only one score
    };

    getUserName(){
        return this.userName;
    };

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

    changeScore(newScore){
        this.userScore = newScore;
        return this.userScore;
    };
};

module.exports = User;