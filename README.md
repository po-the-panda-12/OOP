Corporate Pass Application, java spring postgresql backend with react.js frontend

# A stable version of both frontend and backend has been deployed using free cloud premises
A stable frontend react app has been deployed using github pages at: https://piplupowo.github.io/react <br>
interacting with spring backend and postgresql database deployed on heroku.
You may test the app out at https://piplupowo.github.io/react if you want a demo without installing anything to your local machine. (app hosted on free cloud premises may be slower in responses compared to testing on local machine)


# For Local deployment: please run the backend app first:

HOW TO RUN BACKEND (which is in demo folder) (using intelliJ, student have free premium version) 

Video reference (@33:50): https://www.youtube.com/watch?v=9SGDpanrc8U

Build maven project, right click pom.xml and add as maven project / reload maven project

Run the demoApplication class

Go to: OOPproject/src/main/resources/application.properties

You should see these 2 lines:

spring.datasource.username=postgres

spring.datasource.password=

^username is "postgres" by default. Enter your own password.

Create a database on pgAdmin (app for postgres) called "oopdatabase"

After running the backend, you may now run the frontend react app.
FRONTEND
# TO RUN FRONTEND REACT APP, ENSURE YOU HAVE NODE.JS INSTALLED AND go to this project directory and into the frontend/crud_app in cmd,<br>
type "npm install"<br>
type "npm start"<br>
go to [http://localhost:3000/react](http://localhost:3000/react)<br><br>
