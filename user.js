class User {
    constructor(userName,userEmail,userScore){
        this.userName = userName;    // a user can have only one name and it hast to be unique
        this.userEmail = userEmail ; // a user can have more than one email
        this.userScore = userScore ; // a user can have only one score
    };

    getUserName(){
        return this.userName;
    };

    createNewEmail(){
        this.userEmail.push(this.userEmail.length+1);
        return this.userEmail.length;
    };

    createNewScore(){
        this.userScore += 1;
        return this.userScore;
    };
};

module.exports = User;