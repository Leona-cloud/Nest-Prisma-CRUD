import { Actions, RequiredRule, Subjects } from "../interfaces";


export class UPDATENOTES implements RequiredRule{
    action: Actions = Actions.Update;
    subject: Subjects = "Note"
}