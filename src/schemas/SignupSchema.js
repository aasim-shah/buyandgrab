import * as YUP from 'yup'

export const SignSchemaValidation  = YUP.object({
    email : YUP.string().email().required('Email Field is Mendatory !'),
    password : YUP.string().min(5).max(12).required('Please Enter Your Password !'),
    Cpassword : YUP.string().min(5).max(12).required('Please Enter Your CPassword !').oneOf([YUP.ref("password"), null], "Passwords does nt matches !")
}) 