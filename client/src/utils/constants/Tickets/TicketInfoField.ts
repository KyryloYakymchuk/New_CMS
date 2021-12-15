import * as Yup from 'yup';
export const tickeInfoLine = [
    { value: 'firstname', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Number' },
    { value: 'subject', label: 'Subject' },
    { value: 'text', label: 'Text' }
];
export const validationSchema = Yup.object().shape({
    text: Yup.string().min(3, 'Too Short!').required('Required'),
    subject: Yup.string().min(3, 'Too Short!').required('Required')
});
export const initialValues = { text: '', subject: '' };