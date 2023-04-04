import ErrorForm from '../ErrorForm'
import style from './index.module.scss'

interface TextField {
    name: string
    label ?: string
    placeholder?: string
    size?: any
    id: any
    type: string
    register: any
    error?: any
}

export default function FormTextField(props: TextField){
    const {name, label, placeholder, size, id, type, register, error} = props


    return (
        <div className={style.textFiledDiv}>
            <label htmlFor={id} className={style.TextFieldLabel}>
                {label} <b>{error ? "*" : ""}</b>
            </label> <br />
            <input 
                {...register(name, {
                    required:error ? true : false,
                })}

                type={type}
                className={style.TextFieldInput}
                id={id}
                placeholder={placeholder}
            />
            
            {
                        (error != undefined) && (error[name] && <ErrorForm message={`${error[name]?.message}`}/>)
                    }
        </div>
        )
}