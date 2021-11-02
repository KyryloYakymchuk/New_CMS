export const parserGroupNames = (arr: any) => {
    const arrOfGroupsName: string[] = [];
    arr?.groups?.forEach((element: any) => {
        arrOfGroupsName.push(element?.name);
    });
    return arrOfGroupsName;
};
//dont have type of group response, group module in developing
