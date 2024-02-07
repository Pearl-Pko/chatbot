const data = require("../data.json");
const {Dialog} = require("../dialog");

const listAllDepartments = () => {
    return data["department"]
        .map((department) => department.name.toLowerCase())
        .join("|");
};

const getCurrentHod = (message) => {
    const departments = listAllDepartments();
    const departmentsRegex = new RegExp(departments);

    let i;
    for (i = 0; i < message.length; i++) {
        if (departmentsRegex.test(message[i])) break;
    }

    console.log(message[i]);

    const department = data["department"].find(
        (department) => department.name.toLowerCase() === message[i]
    );

    return new Dialog(
        () => {
            return `The current hod of ${message[i]} is ${department.hod}`;
        },
        [/hod|head of department/i],
        ["who", "is", "the", /hod|head of department/i, "of"]
    );
};

module.exports = {getCurrentHod};
