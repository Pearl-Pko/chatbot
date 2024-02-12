const data = require("../data.json");
const {Dialog} = require("../dialog");

const creditLoadRegex = /\w{3}\s?\d{3}/i;

const getCoursePrerequisite = (message) => {
    return new Dialog(
        () => {
            const result = message.match(creditLoadRegex)?.[0];

            const course = data["courses"].find(
                (course) =>
                    course.code.toLowerCase() === result.replaceAll(" ", "")
            );
            if (result && course)
                return `The prerequisites for ${course.code} ${
                    course.prerequisites.length === 0 ? "is" : "are"
                } ${course.prerequisites.join(", ")}`;
            else if (result) return `There is no such course as ${result}`;
        },
        [creditLoadRegex, "prerequisite"],
        ["prerequisite", "what", creditLoadRegex]
    );
};

module.exports = {getCoursePrerequisite};
