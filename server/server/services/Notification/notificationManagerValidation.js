import { isInputBlank, isNotNumber } from "../generalValidator";
class NotificationManagerValidator{
    constructor(){}
    isNotificationValid(officeId, content, madeBy, category){
        if(isNotNumber(officeId)) return false;
        if(isInputBlank(content)) return false;
        if(isInputBlank(madeBy)) return false;
        if(isInputBlank(category)) return false;
        return true;
    }
}

module.exports = NotificationManagerValidator;