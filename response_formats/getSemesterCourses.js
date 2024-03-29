const data = require("../data.json");
const {Dialog} = require("../dialog");
const {listAllDepartments} = require("./getCurrentHod");

// const getLevelRegex = /(\d{3})\s?level/i;
const getLevelRegex = /([1-4]00)\s?level/i;
const getSemesterRegex = /(first|second)\ssemester/i;
const departments = listAllDepartments();
const departmentsRegex = new RegExp(departments);

const getSemesterCourses = (message) => {
    return new Dialog(
        () => {
            const level = message.match(getLevelRegex)?.[1];
            const semester = message.match(getSemesterRegex)?.[1];

            const departmentText = message.match(departmentsRegex)?.[0];

            const department = data["department"].find(
                (department) => department.name.toLowerCase() === departmentText
            );

            // console.log(department);
            return `The ${level} level ${semester} semester courses in the ${
                department.name
            } Department are:\n${department["courses"][level + " level"][
                semester + " semester"
            ].join("\n")}`;
        },
        [getLevelRegex, getSemesterRegex, departmentsRegex],
        [
            "offered",
            "list",
            "courses",
            getLevelRegex,
            getSemesterRegex,
            departmentsRegex,
        ]
    );
};

module.exports = {getSemesterCourses};
