#!/usr/bin/env node
'use strict';

import chalk from 'chalk';
import link from 'terminal-link';
import open from 'open';
import iq from 'inquirer';

const bio = {
  name: 'Serkan USLU',
  profession: 'front end developer',
  location: 'Istanbul, Turkey',
  passion: 'front end development',
  github: 'github.com/serkan-uslu',
  githubLink: 'https://github.com/serkan-uslu',
  linkedin: 'https://linkedin.com/in/serkan-uslu',
  medium: 'https://medium.com/@serkan-uslu',
};

const startHere = async () => {
  console.log(`
Hello, My name is ${chalk.cyan.bold(bio.name)}!

I'm a ${chalk.underline.green.overline.bold(
    bio.profession,
  )} and living in ${chalk.bold(bio.location)}.
I love ${chalk.underline.bold.green(
    bio.passion,
  )} and I build things on my GitHub profile ${link(
    chalk.cyan.bold(bio.githubLink),
    bio.githubLink,
  )}.
  `);

  iq.prompt([
    {
      type: 'list',
      message: 'Would you like to know more about me?  \n',
      name: 'open',
      choices: [
        {
          name: chalk.bgBlue(
            `You can see my Linkedin Profile (${chalk.bold('LinkedIn')})`,
          ),
          value: bio.linkedin,
        },
        {
          name: chalk.bgGray(
            `What am I doing on Github? (${chalk.bold('GitHub')})`,
          ),
          value: bio.github,
        },
        {
          name: chalk.bgBlack(
            `Read my articles on Medium? (${chalk.bold('Medium')})`,
          ),
          value: bio.medium,
        },
        {
          name: chalk.red('No Thanks.Bye. \n'),
          value: false,
        },
      ],
    },
  ])
    .then(function (a) {
      if (a.open) {
        open(a.open).catch((error) => {
          console.error(chalk.red('Error while opening the link: '), error);
        });
      } else {
        console.log(chalk.green('Thank you! Have a great day!'));
      }
    })
    .catch(function (error) {
      console.error(
        chalk.red('An error occurred during the interaction:'),
        error,
      );
    });
};

startHere();
