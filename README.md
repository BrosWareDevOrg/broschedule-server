# Schedulo's API REST

Schedulo is a platform that allows users to book appointments with service providers and enables service providers to manage their schedules and appointments.

Schedulo's API Rest is a web service that allows Brosware developers to interact with Schedulo's appointment booking platform programmatically. The API follows the REST architectural style, which enables developers to create, read, update, and delete resources through a set of HTTP methods, such as GET, POST, PUT, and DELETE.

With Schedulo's API Rest, developers can perform various tasks programmatically, such as creating appointments, managing schedules, and retrieving information about service providers. The API is designed to be flexible and scalable, enabling developers to build custom solutions that meet their specific needs.

## How to run this project

#### Clone the repository

    git clone https://github.com/brosware/broschedule-server.git

#### Install dependencies

    cd broschedule-server
    npm install

#### Setup environment file
Create a file at root called `.env` and add the enviroment variables. You can also copy the content of `.env.example` file and add the variables.

    MONGO_URL=<mongo url>
    PORT=<Number 3000>

#### Run the application
    npm run dev

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Tech Stack

A tech stack, short for technology stack, is a set of technologies used to build this web application. It includes a combination of programming languages, frameworks, libraries, and tools that are used to develop this API Rest.

|Tech | Description  |
| :-----: | :-----: |
|<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png" alt="javascript" width="50" height="50"/>|- Implement HTTP requests to external services to get data asynchronously<br> - Asynchronous functions<br>- Callbacks and Promises|
|<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/540px-Npm-logo.svg.png" alt="javascript" width="80" height="40"/>|- npm package manager|
|<img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" alt="javascript" width="120" height="40"/>|- Create a web server<br> - Connect database|
|<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png" width="130" height="40"/>|- Cloud database|
|<img src="https://cdn.shopify.com/s/files/1/0057/5668/2355/files/Postman-logo-orange-2021_1155x.png?v=1637252529" width="130" height="40"/>|-HTTP request<br> -API REST documentation|
|<img src="https://3987944058-files.gitbook.io/~/files/v0/b/gitbook-legacy-files/o/assets%2F-Lgyno4NC7rhy49BAEjN%2F-Lh2uMF0SeRmgQ9ESrbj%2F-Lh3BNps2alvubBYGzN1%2FScreen%20Shot%202019-06-10%20at%208.40.12%20PM.png?alt=media&token=b33b7f94-657f-4c88-b55c-8cbb586dfdea" alt="javascript" width="120" height="30"/>|- Create schemas|
|<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Trello-logo-blue.svg/2560px-Trello-logo-blue.svg.png" alt="javascript" width="120" height="30"/>|- Organize teamwork|

<br>

## Members

|Photo | Name  | Mail | Github
| :-----: | :-----: | :-----: | :-----: |
<img src="https://avatars.githubusercontent.com/u/84218482?v=4" height="50" width="50">| Damian Palavecino | damianpalavecino25@gmail.com | [@DamianPalavecino](https://github.com/DamianPalavecino)
<img src="https://avatars.githubusercontent.com/u/96196361?v=4" height="50" width="50">| Julian Flores | julianfloresdev@gmail.com | [@JulianFloresDev](https://github.com/JulianFloresDev)
<img src="https://avatars.githubusercontent.com/u/85576085?v=4" height="50" width="50">| Ernesto Bessone | ejubessone@hotmail.com | [@eju97](https://github.com/Eju97)


<br>

### License & Copyright

[© Brosware](https://github.com/brosware)
