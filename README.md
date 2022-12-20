# Helsinki city bike app (Dev Academy pre-assignment)

This is the pre-assignment for Solita Dev Academy Finland 2023.

## Getting started

1. Create a database

In the backend folder you find DBScript.sql file open it and copy all of the content.
Open your SQL database in the terminal and paste the content of the file.
When it is done you have a database.

2. Configure .env file

In the root of frontend and backend folders you find .env files
Open the, and change values if needed:

| Field name            | Description                                                                                                             |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------|
| DATABASE_DIALECT      | mariadb                                                                                                                 |
| DATABASE_NAME         | name of your database, helsinki_city_bike is default                                                                    |
| DATABASE_USER         | username of your SQL database                                                                                           |
| DATABASE_PASSWORD     | password for the username                                                                                               |
| SERVER_HOST           | hostname, localhost is default                                                                                          |
| SERVER_PORT           | port number, where you wish to run API , 8080 is default                                                                |
| CORS_ORIGIN           | base URL of your application = where your application (UI) is running, http://localhost:3000 is default                 |
| REACT_APP_SERVER_HOST | hostname should be the same as SERVER_HOST, localhost is default                                                        |
| REACT_APP_SERVER_PORT | port number should be the same as SERVER_PORT                                                                           |
| REACT_APP_SERVER_PORT | http://localhost:8080   isdefault                                                                                       |

3. Install npm packages

Go into the frontend & backend folders one by one and write to the console:

<code>npm i</code>

4. Add data to the data folders

  Download files:
  
  https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv <br/>
  https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv <br/>
  https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv <br/>
  
  Put them to: 
  
  backend/data/csv/journeys
  
  **Important!** Delete addDatahere file
  
  backend/data/csv/bicycle-stations-dataset has already file inside, and it accepts another files with same format if it is desired 
  
  5. 
  

  
