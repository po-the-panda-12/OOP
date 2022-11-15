A stable frontend react app has been deployed using github pages at: https://piplupowo.github.io/react <br>
interacting with spring backend and postgresql database deployed on heroku.
You may test the app out at https://piplupowo.github.io/react if you want a demo without installing anything to your local machine. (app hosted on free cloud premises may be slower in responses compared to testing on local machine)

FRONTEND
# TO RUN REACT APP, ENSURE YOU HAVE NODE.JS INSTALLED AND go to this project directory in cmd,<br>
type "npm install"<br>
type "npm start"<br>
go to [http://localhost:3000](http://localhost:3000)<br><br>


HOW TO RUN BACKEND (which is in demo folder) (using intelliJ, student have free premium version) 

Video reference (@33:50): https://www.youtube.com/watch?v=9SGDpanrc8U

Go to: OOPproject/src/main/resources/application.properties

You should see these 2 lines:

spring.datasource.username=postgres

spring.datasource.password=

^username is "postgres" by default. Enter your own password.

Create a database on pgAdmin (app for postgres) called "oopdatabase"

How to test API endpoints:

Currently there are 8
<h1> Users </h1>
Read Users (GET REQUEST): http://localhost:8080/api/v1/users

Create Users (POST REQUEST): http://localhost:8080/api/v1/users

Update Users (PUT REQUEST): http://localhost:8080/api/v1/users/1?name=Maria&email=mariam.jamalllllll@gmail.com

Delete Users (DELETE REQUEST): http://localhost:8080/api/v1/users/1

<h1> Loanpass </h1>
Read Loanpass (GET REQUEST): http://localhost:8080/api/v1/loanpass

Create Loanpass (POST REQUEST): http://localhost:8080/api/v1/loanpass

Update Loanpass (PUT REQUEST): http://localhost:8080/api/v1/loanpass/<passId>

Delete Loanpass (DELETE REQUEST): http://localhost:8080/api/v1/loanpass/<passId>

Download JavaSpringBootIntro.postman_collection and import into Postman to test
