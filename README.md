# Seoulspice Pickup Front End

### Setup Prerequisites

- Install git if you don't have it already. The link below describes several ways to do this.

  https://git-scm.com/download/mac

- Optional: Install nvm. This makes it easy to install multiple versions of node and switch between them.
  https://github.com/nvm-sh/nvm

- Install node if you don't have it already. I'm using node version 14. You can use nvm to install node, or install it directly from the node website:
  https://nodejs.org/en/download/

### Client setup

- Fork the client app: `https://github.com/michaelcaterisano/seoulspice-pickup-app`

- Create three files in the project root directory: `.env`, `.env.development`, and `.env.staging`. I'll send you the contents for each of the files. Copy the contents into the appropriate files.

- In the project root directory, run `npm install` to install node modules

- To start the app in development mode, run `npm run serve:development`. You'll now have an instance of the Vue app running on localhost:8080, and it will send API calls to localhost:3002, the development version of the server.

- To run the app in staging mode, run `npm run serve:staging`. This will also run the Vue app on localhost:8080 (assuming no other instance of the Vue app is already running), and will target localhost:3001, the production version of the server.

- To run in production mode, run `npm run serve:production`. This will behave the same as above. You likely won't need to run the app in this mode; staging mode should be sufficient for testing against the production server.
