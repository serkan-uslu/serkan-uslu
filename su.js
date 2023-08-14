import chalk from "chalk";
import link from "terminal-link";
import inquirer from "inquirer";
import open from "open";

const startHere = async () => {
  console.log(`
Hello, My name is ${chalk.cyan.bold("Serkan USLU")}!

I'm a ${chalk.underline.green.overline.bold(
    "front end developer"
  )} and living in ${chalk.bold("Istanbul, Turkey")}.
I love ${chalk.underline.bold.green(
    "front end development"
  )} and I build things on my GitHub profile ${link(
    chalk.cyan.bold("github.com/serkan-uslu"),
    "https://github.com/serkan-uslu"
  )}.
  `);

  const terminalLinks = await inquirer.prompt([
    {
      type: "list",
      message: "Would you like to know more about me?  \n",
      name: "open",
      choices: [
        {
          name: chalk.blue(
            `You can see my Linkedin Profile (${chalk.bold("LinkedIn")})`
          ),
          value: "https://linkedin.com/in/serkan-uslu",
        },
        {
          name: chalk.white(
            `What am I doing on Github? (${chalk.bold("GitHub")})`
          ),
          value: "https://github.com/serkan-uslu",
        },
        {
          name: chalk.white(
            `Read my articles on Medium? (${chalk.bold("Medium")})`
          ),
          value: "https://medium.com/@serkan-uslu",
        },
        {
          name: chalk.white(
            `Would you like to see my CSS skils? (${chalk.bold("Codepen")})`
          ),
          value: "https://codepen.io/serkan-uslu",
        },
        {
          name: chalk.white(
            `My code snippets are here? (${chalk.bold("Codesandbox")})`
          ),
          value: "https://codesandbox.io/u/serkan-uslu",
        },
        {
          name: chalk.red("👋 No Thanks.Bye. \n"),
          value: false,
        },
      ],
    },
  ]);

  if (terminalLinks.open) {
    open(terminalLinks.open);
  }
};

startHere();
