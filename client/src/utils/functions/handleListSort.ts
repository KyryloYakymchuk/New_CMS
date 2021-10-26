export const handleListSort = (currentSortField:string, flag:number, sortFildName:string) =>{
    let currentFlag = flag; 
    let currentSortParams = {};

    if (currentSortField !== sortFildName ) {
        currentFlag = 0;
    } 
    
    if (currentFlag === 2) {
        currentFlag = 0;
    } else {
        currentSortParams = { 
            'sortField':currentSortField, 
            'sortParameter' : currentFlag ? 'ascending' : 'descending'
        }; 
        currentFlag++;
    } 
    return { currentSortParams, currentFlag };
};