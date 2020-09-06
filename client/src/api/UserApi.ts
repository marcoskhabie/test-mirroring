import {API_BASE_URL} from '../constants/constants'
import {request} from './APIUtils'
import {User} from '../components/types/types'

export function getAllUsers(): Promise<User[]> {
    return request({
        url: API_BASE_URL + "/user",
        method: 'GET'
    });
}

export function registerUser(email: string, username: string, password: string, role: string): Promise<User[]> {
    return request({
        url: API_BASE_URL + "/user",
        method: 'POST',
        body: JSON.stringify({'email': email, 'username': username, 'password': password, 'role': role})
    });
}

export function loginUser(email: string, password: string, role: string ): Promise<any> {
    return request({
        url: API_BASE_URL + "/login",
        method: 'POST',
        body: JSON.stringify({'email': email, 'password': password,'role': role })
    });
}

export function deleteUser(): Promise<any> {
    return request({
        url: API_BASE_URL + "/user",
        method: 'DELETE',
        headers:{'Authorization': 'Bearer '+ localStorage.getItem('token')}
    });
}

export function getUserData(id: string): Promise<any> {
    return request({
        url: API_BASE_URL + "/user/" + id,
        method: 'GET',
        headers:{'Authorization': 'Bearer '+ localStorage.getItem('token')}
    });
}
