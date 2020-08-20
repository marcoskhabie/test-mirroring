import React, { Component } from 'react'
import "./Register.css"
import {TrendzInput} from "../common/TrendzInput/TrendzInput";
import {TrendzButton} from "../common/TrendzButton/TrendzButton";
import logo from '../../assets/TrendzLogo.png';
import {Formik} from 'formik';
import * as yup from 'yup';

export type Props = {

}

export type State = {

}

const registerSchema = yup.object({
    email: yup.string().required('Email is required').email('Invalid email'),
    username: yup.string().required('Username required'),
    password: yup.string().required('Password is required').min(8, 'Password must have at least 8 characters'),
    confirmPassword: yup.string().required('Password confirmation is required').oneOf([yup.ref('password')], 'Passwords must match')
})

export class Register extends Component<Props, State> {

    render() {
        return (
            <div className={"main-container"}>
                <div className={'register-card'}>
                    <div className={'register-header'}>
                        <img className={'trendz-logo'} src={logo} alt={''}/>
                        <div className={'divisor'}/>
                        <div className={'register-title'}>Register</div>
                    </div>
                    <Formik
                        initialValues={{email: '', username: '', password: '', confirmPassword: ''}}
                        onSubmit={values => console.log(values)}
                        validationSchema={registerSchema}
                    >
                        {(props) => (
                            <div className={'form-container'}>
                                <div className={'register-body'}>
                                    <div className={'register-field'}>
                                        <TrendzInput
                                            placeholder={'Email'}
                                            label={'Email'}
                                            onChange={props.handleChange('email')}
                                            value={props.values.email}
                                        />
                                        <div className={'error-message'}>{props.errors.email}</div>
                                    </div>
                                    <div className={'register-field'}>
                                        <TrendzInput
                                            placeholder={'Username'}
                                            label={'Username'}
                                            onChange={props.handleChange('username')}
                                            value={props.values.username}
                                        />
                                        <div className={'error-message'}>{props.errors.username}</div>
                                    </div>
                                    <div className={'register-field'}>
                                        <TrendzInput
                                            placeholder={'Password'}
                                            label={'Password'}
                                            password={true}
                                            onChange={props.handleChange('password')}
                                            value={props.values.password}
                                        />
                                        <div className={'error-message'}>{props.errors.password}</div>
                                    </div>
                                    <div className={'register-field'}>
                                        <TrendzInput
                                            placeholder={'Confirm password'}
                                            label={'Confirm password'}
                                            password={true}
                                            onChange={props.handleChange('confirmPassword')}
                                            value={props.values.confirmPassword}
                                        />
                                        <div className={'error-message'}>{props.errors.confirmPassword}</div>
                                    </div>
                                </div>
                                <div className={'register-footer'}>
                                    <TrendzButton
                                        title={'Submit'}
                                        onClick={() => props.handleSubmit()}
                                        disabled={!!(props.errors.email || props.errors.username || props.errors.password || props.errors.confirmPassword)}
                                    />
                                    <div className={'error-message'}></div>
                                </div>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        )
    }
}

export default Register
