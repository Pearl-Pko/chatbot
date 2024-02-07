const data = require("../data.json");
const {Dialog} = require("../dialog");

const creditLoadRegex = /\w{3}\s?\d{3}/i;

const getCourseCredit = (message, matches) =>
    new Dialog(
        () => {
            let i;
            for (i = 0; i < message.length; i++) {
                if (creditLoadRegex.test(message[i])) break;
            }

            const course = data["courses"].find(
                (course) =>
                    course.code.toLowerCase() === message[i].replaceAll(" ", "")
            );
            console.log(course);
            return `The credit load for ${message[i]} is ${course.credits} credits`;
        },
        [creditLoadRegex, "credit"],
        ["What", "is", "credit", "load", "for", creditLoadRegex]
    );

module.exports = {getCourseCredit};
