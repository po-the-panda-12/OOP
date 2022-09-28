HOW TO RUN BACKEND (which is in demo folder) (using intelliJ, student have free premium version) 

Video reference (@33:50): https://www.youtube.com/watch?v=9SGDpanrc8U

Go to: OOPproject/src/main/resources/application.properties

You should see these 2 lines:

spring.datasource.username=postgres

spring.datasource.password=

^username is "postgres" by default. Enter your own password.

Create a database on pgAdmin (app for postgres) called "oopdatabase"

How to test API endpoints:

Currently there are 3

Create Users: http://localhost:8080/api/v1/users

Update Users: http://localhost:8080/api/v1/users/1?name=Maria&email=mariam.jamalllllll@gmail.com

Delete Users: http://localhost:8080/api/v1/users/1

Download JavaSpringBootIntro.postman_collection and import into Postman to test
