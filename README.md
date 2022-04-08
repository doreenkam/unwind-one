# UNWIND 📖

### Project Description:

A collaborative project from a team of associates at the futureproof Academy for their LAP1 Portfolio Week Project. The brief entailed creating a community journaling website with specific functionality for users:

- Ability to post anonymously
- Limited characters
- Add gifs
- View other entries
- React to entries with an emoji (3)
- Comment on other entries

## Developers:

- Doreen Kamushinda
- Naomi Emojevbe
- Khari - Leigh Miller
- Yusra Tahir

### The Inspiration:

Ever had those random thoughts that are on the borderline of a consipiracy or maybe the inner self talk that deserves external recoginition? Unwind is where you plant those seeds, safely and anonymously, for fellow curious minds to see!


### Installation

- You must be using a linux terminal - git bash or zsh to run this server.
- Clone the repository.
- Ensure node packages are installed, if not then run the following commands:

```
npm install
npm install jest -D
npm install cors
npm install express
npm install nodemon -D
npm install supertest -D
npm install coverage -D`

```

Ensure the package.json file contains the following:

```
"scripts": {
    "start": "nodemon index.js",
    "test": "jest --silent --watchAll",
    "coverage": "jest --coverage --silent"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.17.3"
  },
  "devDependencies": {
    "coverage": "^0.4.1",
    "jest": "^27.5.1",
    "nodemon": "^2.0.15",
    "supertest": "^6.2.2"
  }
```

### Usage

- Setup
- In the terminal/command line:

  `cd server folder`
  `npm start`

This will iniate the server at the given address.

- Deployed using Netlify & Heroku

### Technologies :

- HTML
- CSS
- Node.js
- Express
- Jest
- Trello
- Figma

### Process :

Once the brief was received, we began our project by discussing ideas for the site and we created a Trello board to split tasks and make sure that all the tasks were assigned and being dealt with to avoid confusion.

We then collaborated on building a template of our desired website design using Figma.

![](/homePage.png)

### Test Coverage: 

![](/scriptTest.png)
![](/appTest.png)

### LICENCE

- [MIT License](https://opensource.org/licenses/mit-license.php)

### Achievements :

- Created a project that we are collectively proud of
- Thoroughly enjoyed working together as there was continuous laughter throughout
- Executed great team work in recognising problems and dealing with them efficiently
- Made extremely good use of technologies learnt so far on the course : HTML, CSS and Vanilla JS
- Expanded our learning of JavaScript and DOM Manipulation in creating various functionality for users
- Learnt how to successfully send a post request to an API server

### Challenges

- Handling merge conflicts
- Dealing with diverged branches & having to rebase
- Writing and passing tests

### Code We Are Most Proud Of: 

Collectively, we are most proud of our HTML/CSS code as we spent a lot of time on it to reflect the vibe of our site - to reflect and wind your inner self talk. 

![](/styling.png)

Additionally we are proud of the code our app.js files and server side which enabled our server to run properly and helped to execute a lot of the functionality.

![](/appJScode.png)

### Future Improvements:

- To confidently create more unique features using advanced JavaScript functions
- Creating a more detailed, concise plan at the beginning with a strict schedule to follow to ensure more ease of production
- Personal study must continue in areas surrounding functions, testing and HTTP requests
- Emoji functionality and send count to the json file
- Able to choose gif that you would like to post
