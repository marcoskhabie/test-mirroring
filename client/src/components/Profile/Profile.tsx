import React, {Component} from 'react'
import {TrendzInput} from "../common/TrendzInput/TrendzInput";
import './Profile.css';
import {NavLink} from "react-router-dom";
import {getUserData} from "../../api/UserApi";

export type Props = {}

export type State = {
    username: string,
    email: string
}

class Profile extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            username: '',
            email: ''
        }
    };

    parseJwt (token: any) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    componentDidMount() {
        getUserData(this.parseJwt(localStorage.getItem('token')).userId)
            .then((res) => {
                this.setState({username: res.username, email: res.email})
            })
            .catch(() => this.setState({username: 'Unknown', email: 'Unknown'}))
    }

    render() {
        return (
            <div className={'container'}>
                <div className={'profile-card'}>
                    <div className={'title'}>
                        Profile
                    </div>
                    <div style={{marginBottom: 10}}>
                        <TrendzInput value={this.state.username} disabled={true} label={"Username"}/>
                    </div>
                    <TrendzInput value={this.state.email} disabled={true} label={"Email"}/>
                    <div className={'button-c'}>
                        <NavLink to="/main/editProfile" className="button">Edit</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile
