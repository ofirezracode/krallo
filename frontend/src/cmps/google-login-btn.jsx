import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'

export function GoogleLoginBtn({ onGoogleLogin }) {

    function responseMessage(response) {
        let userData = jwt_decode(response.credential)
        onGoogleLogin(userData)
    }

    function errorMessage(error) {
        console.log(error)
    }
    return (
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} locale={'en'} />
    )
}
