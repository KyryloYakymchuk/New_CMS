
import FormField from '@components/FormField/FormField';
import { initialfileds } from '@utils/constants/Modules/typeSelectData';
import { FC, useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { FieldCustom, FormContainer } from '../SingleFilterForm/styled';

interface IProps {
    selectValue:string;
}

const allField = {
    checkbox: FormField,
    textbox: FormField,
    textarea: FormField,
    upload: FormField,
    module: FormField,
    dropdown: FormField,
    wysiwyg: FormField,
    map: FormField
};

export const CreateFieldForm: FC<IProps> = ({ selectValue }) =>{
    // big data, need typed later 
    const [currentField, setCurrentField] = useState<any>(); 
    console.log(currentField);


  useEffect(() => {
    initialfileds.forEach((field) => {
        if (field.type === selectValue){
         setCurrentField(field);
        } 
     });
  }, [selectValue]);    

const onSubmit = (value:any) => {
    console.log(value);
};
    
return (
    <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
                <FormContainer>
                    <form onSubmit={handleSubmit}>    
                     {selectValue === String(Object.keys(allField))  &&                    
                            <FieldCustom />                        
                     }                    
                    </form>
                </FormContainer>
            )}
        />
);
};