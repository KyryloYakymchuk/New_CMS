import * as Yup from 'yup';

export const createTicketField = [
    { value: 'firstname', label: 'First name' },
    { value: 'lastname', label: 'Last name' },
    { value: 'subject', label: 'Subject' },
    { value: 'email', label: 'Email' },
    { value: 'destination', label: 'Destination' },
    { value: 'phone', label: 'Phone' },
    { value: 'fileName', label: 'File name' },
    { value: 'text', label: 'Text' }
];
export const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('Required'),
    lastname: Yup.string().required('Required'),
    subject: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.number().required('Required'),
    fileName: Yup.string().required('Required'),
    text: Yup.string().required('Required')
});
export const initialValues = {
    firstname: '',
    lastname: '',
    subject: '',
    email: '',
    destination: '',
    phone: '',
    fileName: '',
    text: ''
};
