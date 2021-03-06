/**
 * @type {{log: log}}
 */
module.exports = {
    log: (word) => {
        const time = new Date;
        console.log('\033[31m[' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ']\033[0m ' + word);
    }
};
