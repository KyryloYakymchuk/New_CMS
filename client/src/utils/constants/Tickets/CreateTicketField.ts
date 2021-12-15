import * as Yup from 'yup';

export const createTicketField = [
    { value: 'firstname', label: 'First name', img: null },
    { value: 'lastname', label: 'Last name', img: null },
    { value: 'subject', label: 'Subject', img: null },
    { value: 'email', label: 'Email', img: null },
    { value: 'destination', label: 'Destination', img: null },
    { value: 'phone', label: 'Phone', img: null },
    { value: 'fileName', label: 'File name', img: null },
    { value: 'text', label: 'Text', img: null }
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
