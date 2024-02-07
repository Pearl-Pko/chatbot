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

    let result = message.match(departmentsRegex)?.[0];

    const department = data["department"].find(
        (department) => department.name.toLowerCase() === result
    );

    return new Dialog(
        () => {
            if (result)  
                return `The current Head of Department of ${result} is ${department.hod}`;
            else 
                return 'There is no such department'
        },
        [/hod|head of department/i, departmentsRegex],
        ["who", "is", "the", /hod|head of department/i, "of", departmentsRegex]
    );
};

module.exports = {getCurrentHod, listAllDepartments};
