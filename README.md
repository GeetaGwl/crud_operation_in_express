# crud_operation_in_express
npm init
npm install express --save
npm install -g nodemon
npm install nodemon --save-dev
Update package.json Scripts:

In your project's package.json file, you can add a script that starts your Node.js application using Nodemon. Open your package.json file and add or modify the scripts section like this:

json

"scripts": {
  "start": "node app.js",   // Replace 'app.js' with your entry point
  "dev": "nodemon app.js"    // Use nodemon in the development script
}
In the example above, the dev script uses Nodemon to monitor changes in your code, and it will restart your application automatically.

Run Your Application with Nodemon:

To start your Express application with Nodemon, you can run the following command in your terminal:

bash

npm run dev
This command will start your application using Nodemon, so it will automatically restart 

npm install mysql2 --save for connect data base

npm install ejs , make a new folder views 

