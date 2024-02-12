// import {getCourseCredit} from "./response_formats"
const { getCourseCredit } = require("./response_formats/getCourseCredit");
const {dialog} = require("./dialog");
const {getCurrentHod} = require("./response_formats/getCurrentHod")
const {getSemesterCourses} = require("./response_formats/getSemesterCourses")
const {getInvalidResponse} = require("./response_formats/getInvalidResponse");
const {getCourseName} = require("./response_formats/getCourseName");
const {getCourseStatus} = require("./response_formats/getCourseStatus");
const {getIntroduction} = require("./response_formats/getIntroduction");
const {getCoursePrerequisite} = require("./response_formats/getCoursePrerequisites")

const buildDialogTree = (response, message) => {
    //this registers the different responses the chatbot can perform
    response(getInvalidResponse(message));
    response(getIntroduction(message));
    response(getCourseName(message));
    response(getCourseCredit(message));
    response(getCoursePrerequisite(message));
    response(getCurrentHod(message));
    response(getSemesterCourses(message));
    response(getCourseStatus(message))
}

module.exports = {buildDialogTree}