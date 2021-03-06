import React from 'react';
import './TrendzInput.css';

type InputProps = {
    value?: string,
    label?: string,
    placeholder?: string,
    disabled?: boolean,
    password?: boolean,
    onChange?: any,
    onFocus?: any,
    onBlur?: any,
    width?: any,

}

export const TrendzInput = (props: InputProps) => (
    <div className={'input-wrapper'}>
        <div className={'input-label'}>{props.label}</div>
        <input
            onChange={props.onChange}
            disabled={props.disabled}
            placeholder={props.placeholder}
            type={props.password ? 'password' : 'text'}
            value={props.value}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            style={{width: props.width}}

        />
    </div>
)