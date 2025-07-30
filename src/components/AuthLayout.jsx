import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function AuthLayout({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        // If authentication is required and user is not authenticated, redirect to login
        if(authentication && !authStatus){
            navigate("/login")
        } 
        // If authentication is NOT required (like login/signup pages) and user IS authenticated, redirect to home
        else if(!authentication && authStatus){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}