const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employeeInfo = [
    {
        type: 'input',
        message: 'Enter the name of the employee',
        name: 'name'
    },
    {
        type: 'input',
        message: 'Enter the ID number of the employee',
        name: 'id'
    },
    {
        type: 'input',
        message: 'Enter the email address of the employee',
        name: 'email'
    },
    { 
        type: 'list',
        message: 'What is your role?',
        name: 'role',
        choices: ["Manager", "Intern", "Engineer"]
    },
    {
        type: 'input',
        message: 'Enter the office number of the manager',
        name: 'officeNumber',
        when: (answers) => answers.role === "Manager"
    },
    {
        type: 'input',
        message: 'Enter the school of the intern',
        name: 'school',
        when: (answers) => answers.role === "Intern"
    },
    {
        type: 'input',
        message: 'Enter the Engineers GitHub profile',
        name: 'gitHub',
        when: (answers) => answers.role === "Engineer"
    },

]; 
const employees = [];

function promptEmployee() {
    inquirer.prompt(employeeInfo).then((answers) => {
    
        if (answers.role === "Engineer") {
            let e = new Engineer(answers.name, answers.id, answers.email, answers.role, answers.gitHub)
            employees.push(e);
        }
        if (answers.role === "Intern") {
            let i = new Intern(answers.name, answers.id, answers.email, answers.role, answers.school)
            employees.push(i);
        }
        if (answers.role === "Manager") {
            let m = new Manager(answers.name, answers.id, answers.email, answers.role, answers.officeNumber)
            employees.push(m);
        }
    
        askForAnotherEmployee();
    });
}

function askForAnotherEmployee() {
    inquirer.prompt([{
        type: "confirm",
        message: "Do you want to input another employee?",
        name: "choice"
    }]).then((answers) => {
        if (answers.choice) {
            promptEmployee();
        } else {
            fs.writeFile("./output/team.html", render(employees), (err) =>
                err ? console.error(err) : console.log("file written"));
        }
    });
}

promptEmployee();





// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
