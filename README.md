## eRestaurant
eRestaurant Application for _Le Bistrot d'Andre_ (a SES 1A project)

#### Group 1 (Not French) Team Members
* [Grace Billiris](https://www.linkedin.com/in/grace-billiris/) (13925894)
* [Ashish Chadha](https://www.linkedin.com/in/ashishpchadha/) (13918178)
* [Yeran Hettiarachchy](https://www.linkedin.com/in/yeran-hettiarachchy/) (13888767)	
* [Jerome Sario](https://www.linkedin.com/in/jerome-sario/) (13903051)
* [Jingbin Wang](https://www.linkedin.com/in/jingbin-wang/) (14106153)

## Setting Up The Application
**Prerequisites**
<br/>
Make sure you have `MongoDB Compass` and `Community Server` installed on your computer.

**Steps**
<br/>
1. Clone the repository
2. Open the folder in an IDE (preferably Visual Studio Code)
3. Open `Mongodb Compass`
4. Make sure there is no database named ‘eRestaurant’
5. In the IDE terminal: `npm install` (make sure the `node_modules` folder appears in your IDE Explorer)
6. Split your IDE Terminal
7. In one terminal type: `npm start`. This will start the Web Application on `http:localhost:3000`
8. In the other terminal type: `node server.js`. This will start the Backend on `http:localhost:8080`

**Mongodb**
<br/>
Use the Connection String: `mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false` to connect to the eRestaurant database

## Coding Standards
**General**
* Branch off Master when making commits

**Naming Conventions**
* React UI Components files - camelCase e.g. `createBooking`
* Non-component files - lower case e.g. `history`
* Folder names - camelCase e.g. `component`
* Css style names - hyphen delimited strings e.g. `first-word`

**Indentations**
* A single tab

**Layout**
* Braces kept on the same line as the opening line

**Commenting**
* Comments on the line before a function
* Comments on every second line (within reason) in a JavaScript function

**Code Review**
* Make sure AT LEAST one other person reviews your code before committing to the `Master` branch
    * Make a Pull Request so someone can review your code!
