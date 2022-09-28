import { DefaultProperties } from "../../defaultProperties";

export class UserUserGroup extends DefaultProperties {
    userId: number;
    userGroupId: number;
    groupName?:string;
    description?:string;
}