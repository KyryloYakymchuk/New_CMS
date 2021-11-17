export const emailRE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const passwordSpacesRE = /(\s)/g;
export const cyrillicRE = /[^a-zA-Z0-9]/g;
export const passwordUpperCaseRE = /[^a-zA-Z0-9]/g;
export const passwordMatch =
 /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
 export const onlyNum = /^\d*(\.\d+)?$/;
 export const onlyLatin = /^[A-Za-z]+$/;


