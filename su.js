#!/usr/bin/env node
'use strict';

import chalk from 'chalk';
import open from 'open';
import iq from 'inquirer';
import fetch from 'node-fetch';

const bio = {
  readmeFileURL:
    'https://raw.githubusercontent.com/serkan-uslu/serkan-uslu/main/README.md',
  name: 'Serkan USLU',
  profession: 'front end developer',
  location: 'Istanbul, Turkey',
  passion: 'front end development',
  github: 'github.com/serkan-uslu',
  githubLink: 'https://github.com/serkan-uslu',
  linkedin: 'https://linkedin.com/in/serkan-uslu',
  medium: 'https://medium.com/@serkan-uslu',
};

const printReadme = async (readmeFileURL) => {
  try {
    const response = await fetch(readmeFileURL);
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response.statusText}`);
    }
    let text = await response.text();
    const startTag = '<!-- npx serkan-uslu:START -->';
    const endTag = '<!-- npx serkan-uslu:END -->';
    const startIndex = text.indexOf(startTag) + startTag.length;
    const endIndex = text.indexOf(endTag);

    if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
      const blogPostList = text.slice(startIndex, endIndex);
      return blogPostList;
    } else {
      console.error('Tags not found or misordered');
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const startHere = async () => {
  const me = await printReadme(bio.readmeFileURL);
  console.log(me);

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
          name: chalk.bgGrey(
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
          name: chalk.gray('No Thanks.Bye. \n'),
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
