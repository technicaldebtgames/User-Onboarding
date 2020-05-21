import * as yup from 'yup'

//form validation
const formSchema = yup.object().shape({
    name: yup.string()
             .trim()
             .min(3, 'Please enter a name with more than 2 characters.')
             .required('Please enter a name.'),
    email: yup.string()
              .trim()
              .email('Please enter a valid email address.')
              .required('Please enter an email address.'),
    role: yup.string()
             .required('Please select a role.'),
    tos: yup.bool()
            .oneOf([true], 'Please select that you have read and understand the Terms of Service.') //I don't think this is the problem, but I dunno.
    
});

export default formSchema;