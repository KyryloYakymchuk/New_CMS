interface IreqObj {
  limit: number;
  offset: number;

}
export const queryStringGenerator = (
  offset: number,
  limit: number,
  count?: number
): string => {
  const reqObj:any = {
    limit: limit,
    offset: count === offset + 1 ? offset - limit : offset,
  };
  let params = "?";
  for (let key  in reqObj) {      
    params = `${params}` + `${key}=${reqObj[key]}&`;
  }  
  return params;
};
