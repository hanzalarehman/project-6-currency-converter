#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
let loop = true;
while (loop) {
    //currency converter api link
    let apiLink = "https://v6.exchangerate-api.com/v6/6f2f1fe2343aedbd9a0e2679/latest/USD";
    //console.log(apiLink)
    // fetching data
    let fetchsData = async (data) => {
        let fetchData = await fetch(data);
        let res = await fetchData.json();
        return res.conversion_rates;
    };
    let p = await fetchsData(apiLink);
    //console.log(p)
    // creating object
    let country = Object.keys(p);
    //console.log(country)
    let firstCountry = await inquirer.prompt([{
            name: 'name',
            type: 'list',
            message: 'CONVERTED FROM',
            choices: country
        }]);
    // first country money
    let userMoney = await inquirer.prompt([{
            name: "rupee",
            type: 'number',
            message: `Enter the amount ${chalk.green.bold(firstCountry.name)}`
        }]);
    //convert country
    let secondCountry = await inquirer.prompt([{
            name: 'name',
            type: 'list',
            message: 'CONVERTING TO',
            choices: country
        }]);
    let CNV = `https://v6.exchangerate-api.com/v6/6f2f1fe2343aedbd9a0e2679/pair/${firstCountry.name}/${secondCountry.name}`;
    //fetching data
    let cnvData = async (d) => {
        let cnvData = await fetch(d);
        let res = await cnvData.json();
        return res.conversion_rate;
    };
    let conversionRate = await cnvData(CNV);
    let finalResult = userMoney.rupee * conversionRate;
    console.log(`Your ${chalk.blueBright.bold(firstCountry.name)} ${chalk.yellowBright.bold(userMoney.rupee)} in ${chalk.greenBright.bold(secondCountry.name)} is ${chalk.redBright.bold(finalResult)}`);
    let agin = await inquirer.prompt({
        name: 'again',
        type: 'confirm',
        message: 'Do you want to convert again'
    });
    if (agin.again == true) {
        console.log(`Your ${chalk.blueBright.bold(firstCountry.name)} ${chalk.yellowBright.bold(userMoney.rupee)} in ${chalk.greenBright.bold(secondCountry.name)} is ${chalk.redBright.bold(finalResult)}`);
    }
    else {
        loop = false;
    }
}
