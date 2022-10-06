FRONTEND
https://github.com/IS442-202223T1/group-project-g1t7/tree/main/frontend/crud_app

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
