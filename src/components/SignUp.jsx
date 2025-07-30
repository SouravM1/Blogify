import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center w-full min-h-screen py-8 px-4">
        <div className={`mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg bg-gray-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 border border-black/10 shadow-lg`}>
        <div className="mb-4 sm:mb-6 flex justify-center">
                <span className="inline-block w-full max-w-[80px] sm:max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-xl sm:text-2xl font-bold leading-tight text-gray-800">Sign up to create account</h2>
            <p className="mt-2 sm:mt-3 text-center text-sm sm:text-base text-gray-600">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-purple-600 transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-6 sm:mt-8 text-center text-sm sm:text-base">{error}</p>}

            <form onSubmit={handleSubmit(create)} className="mt-6 sm:mt-8">
                <div className='space-y-4 sm:space-y-5'>
                    <Input
                    label="Full Name: "
                    placeholder="Enter your full name"
                    {...register("name", {
                        required: true,
                    })}
                    />
                    <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true,})}
                    />
                    <Button type="submit" className="w-full text-sm sm:text-base py-2 sm:py-3">
                        Create Account
                    </Button>
                </div>
            </form>
        </div>

    </div>
  )
}

export default Signup