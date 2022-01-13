# README

## How the browser calls the different files to render the webpage

Note: At the moment, this application is a single page application (SPA) so there are no other urls that you can enter. All create and destroy operations that act on the database
will be presented as a pop up dialog box for the user.

1. The browser renders app/views/layouts/application.html.erb and then runs the rails "yield" keyword


2. It then goes to app/views/beers/index.html.erb to try to render the index page, because it realizes that the root is "beer#index" as defined in config/routes.rb


3. However, since it is empty, it then goes to the api-v1-beers controller to call it's index method. This is at app/controllers/api/v1/beers_controller.rb


4. This app/controllers/api/v1/beers_controller.rb##index method here will call all the beers in the database and render a json. (This is still at the backend.)


5. At the same time, the browser will search for the index.jsx file in app/javascript/packs to render the front end. Here I defined it such that it will render the <App />


6. This <App /> will simply return all the routes that we defined in app/javascript/routes/index.jsx. This is where every route we define will render a certain element/component in
react javascript that we write.


7. For example, <Route path="/" element={<Home/>} /> will mean that at the root path, the react component Home will be rendered.


8. Now if you go to the Home component at app/javascript/components/Home.jsx, you will see that it will add certain html tags, and text, then calls another component called <Beers />


9. Now in the Beers react component at app/javascript/components/Beers.jsx, there are react javascript code that will 
load the beers from the database (which is done by fetching json information from "api/v1/beers/index" in relative 
path. The prefix is whatever server your current application is running on). After receiving the json information, it 
will then render a table for you which uses a third-party library called "antd".

There are many more components being called but this is the beginning of the entire application.


## Known issues
* Currently the web browser is rendering double of the same application even though it seems like <App /> is only
being called once.


## Other information
This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

[Important info about how this application works](#how-the-browser-calls-the-different-files-to-render-the-webpage)
