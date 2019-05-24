import inquirer from 'inquirer';
import request from 'request';

async function promptForMissingOptions() {
  let options = {};
  const questions = [];
  questions.push({
    type: 'string',
    name: 'firstName',
    message: 'Please enter your first name',
    validate: (name) => {
        return name !== '';
    }
  });
  questions.push({
    type: 'string',
    name: 'lastName',
    message: 'Please enter your last name',
    validate: (name) => {
        return name !== '';
    }
  });
  questions.push({
    type: 'number',
    name: 'month',
    message: 'Please enter your birthday month in mm(integer required)',
    validate: (month) => {
        if (!Number.isInteger(month)) {
          return false;
        }
        return month >= 1 && month <= 12;
    }
  });
  questions.push({
    type: 'number',
    name: 'date',
    message: 'Please enter your birthday date in dd(integer required)',
    validate: (date) => {
        if (!Number.isInteger(date)) {
          return false;
        }
        return date >= 1 && date <= 31;
    }
  });

  const answers = await inquirer.prompt(questions);
  return answers;
}

let sendPostRequest = (url, body) => {
  request({
    url: url,
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: body,
    json: true
  }, (err, res) => {
    if (err) {
      return console.log(err);
    }
    console.log(res.body);
  });
}


export async function cli(args) {
 let options = await promptForMissingOptions();
 sendPostRequest('http://localhost:8765/checkBirthday', options);
 //console.log(options);
}
