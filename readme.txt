Creating a new name:
    From ubuntu terminal:
        1 - POST 127.0.0.1:8000/names/ 
        2 - <name> + enter
        3 - EOF(ctrl+d)
Creating email for a name resource:
    From ubuntu terminal:
        1 - POST 127.0.0.1:8000/names/<name>/emails/ 
        2 - <email> + enter
        3 - EOF(ctrl+d)
Creating/Updating score for a name resource:
    From ubuntu terminal:
        1 - POST 127.0.0.1:8000/names/<name>/emails/<emails>/scores/
        2 - <score> + enter
        3 - EOF(ctrl+d)
Querying users:
    From ubuntu terminal:
        1 - GET 127.0.0.1:8000/names/
Querying a user:
    From ubuntu terminal:
        1 - GET 127.0.0.1:8000/names/<name>/
Querying a user's email(s):
    From ubuntu terminal:
        1 - GET 127.0.0.1:8000/names/<name>/emails/
Querying a user's score:
    From ubuntu terminal:
        1 - GET 127.0.0.1:8000/names/<name>/emails/<email>/scores/
Deleting a user:
    From ubuntu terminal using curl:
        1 - curl -X DELETE 127.0.0.1:8000/names/<name>/
Deleting a user's email:
    From ubuntu terminal using curl:
        1 - curl -X DELETE 127.0.0.1:8000/names/<name>/email/<email>
Deleting user score is not available.
Updating user name:
    From ubuntu terminal using curl:
        1 - curl -d "<new_name>" -X PUT 127.0.0.1:8000/names/<name>/
Updating a user's email:
    From ubuntu terminal using curl:
        1 - curl -d "<new_email>" -X PUT 127.0.0.1:8000/names/<name>/emails/<email>/
Updating a user's score:
    From ubuntu terminal using curl:
        1 - curl -d "<new_score>" -X PUT 127.0.0.1:8000/names/<name>/emails/<email>/scores/<score>/

All instances deleted when the server shutted down.


