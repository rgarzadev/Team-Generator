const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//create empty teamMembers array
const teamMembers = [];

//team generator function
function teamGenerator() {

    //create manager function
    function createManager() {
        //console.log welcome and instructions
        console.log("Welcome to the Team Generator. Enter Team Manager's info:");

        //prompt user for manager info
        inquirer.prompt([
            {
                name: "managerName",
                message: "Manager's name:"
            },
            {
                name: "managerId",
                message: "Manager's employee id:"
            },
            {
                name: "managerEmail",
                message: "Manager's email:"
            },
            {
                name: "managerOfficeNumber",
                message: "Manager's office number:"
            },
            ])
            
            //create new instance of Manager class using answer data
            .then(answers => {
            const manager = new Manager(
                answers.managerName, 
                answers.managerId, 
                answers.managerEmail, 
                answers.managerOfficeNumber
            );
            //push new instance of manager to teamMembers array
            teamMembers.push(manager);

            //call createTeam function
            createTeam();
        });
    }

    //create team function
    function createTeam() {

        //console.log instructions
        console.log("Add next team member:");

        //prompt user for team info
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                choices: [
                    "Engineer",
                    "Intern",
                    "No more team members to enter"
                ]
            },
            ])
            
            //switch statement to call function based on client's choice
            .then(userChoice => {
                switch(userChoice.memberChoice) {
                    case "Engineer":
                        addEngineer();
                        break;
                    case "Intern":
                        addIntern();
                        break;
                    default:
                        renderTeam();                    
                }
            });
        }
    //add engineer function
    function addEngineer() {
        //prompt user for engineer info
        inquirer.prompt([
            {
                name: "engineerName",
                message: "Engineer's name:"
            },
            {
                name: "engineerId",
                message: "Engineer's employee id:"
            },
            {
                name: "engineerEmail",
                message: "Engineer's email:"
            },
            {
                name: "engineerGithub",
                message: "Engineer's Github username:"
            }
        ])
        //create new instance of Employee class using answer data
        .then(answers => {
            const engineer = new Engineer(
                answers.engineerName,
                answers.engineerId,
                answers.engineerEmail,
                answers.engineerGithub
            );
        
            //push new instance of engineer to teamMembers array
            teamMembers.push(engineer);

            //restart createTeam prompts to create new member
            createTeam();
        });
    }

    //add intern function
    function addIntern() {
        //prompt user for Intern info
        inquirer.prompt([
            {
                name: "internName",
                message: "Intern's name:"
            },
            {
                name: "internId",
                message: "Intern's employee id:"
            },
            {
                name: "internEmail",
                message: "Intern's email:"
            },
            {
                name: "internSchool",
                message: "Intern's school:"
            }
        ])
        //create new instance of Employee class using answer data
        .then(answers => {
            const intern = new Intern(
                answers.internName,
                answers.internId,
                answers.internEmail,
                answers.internSchool
            );
        
            //push new instance of intern to teamMembers array
            teamMembers.push(intern);

            //restart createTeam prompts to create new member
            createTeam();
        });
    }

    //render and output team as HTML
    function renderTeam() {
        //create output directory if it doesn't exist
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        //render HTML to output path
        fs.writeFileSync(outputPath, render(teamMembers), "utf8");
    }

    //call createManager function
    createManager();
}

//call teamGenerator function
teamGenerator();
