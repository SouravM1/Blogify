import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full space-y-2'>
            {label && <label 
            className='inline-block text-sm sm:text-base font-semibold text-gray-700 tracking-wide' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`
                px-4 py-3 sm:py-3.5 rounded-xl bg-white text-gray-900 
                border border-gray-200 w-full text-sm sm:text-base 
                shadow-sm hover:shadow-md
                transition-all duration-300 ease-out
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                focus:shadow-lg focus:bg-gray-50
                placeholder:text-gray-400
                ${className}
            `}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input