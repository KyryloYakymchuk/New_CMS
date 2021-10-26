import FormField from '@components/FormField/FormField';

import { UserFormFields } from '@utils/constants/UserFormFields';
import { FC } from 'react';
import { Form } from 'react-final-form';
import { FieldCustom, FormContainer } from './styled';

interface IProps {
    
}

export const UserForm: FC<IProps> = () => {
    console.log(UserFormFields);
    
    const onSubmit = () =>{
        console.log('fbw');
    };
    return (
        <Form
            onSubmit={onSubmit}
            // validate={RegisterValidator}
            render={({ handleSubmit }) => (
                <FormContainer>
                    <form onSubmit={handleSubmit}>
                        
                        {UserFormFields.map(({ icon, ...field }, index) => (
                            <FieldCustom
                                key={index}
                                {...field}
                                variant="outlined"
                                component={FormField}
                            >
                                {icon}
                            </FieldCustom>
                        ))}
                        
                        
                    </form>
                </FormContainer>
            )}
        />
    );
};