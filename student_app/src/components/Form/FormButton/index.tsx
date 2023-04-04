import style from './index.module.scss'

export interface formButton {
    type: 'submit' | 'reset' | 'button' | undefined, 
    size: string
    color: string
    action?: any
    label: string
    children?: any
    disable?: boolean
}


export default function FormButton(props:formButton){

    const{
        type,
        size,
        color,
        action,
        label,
        children,
        disable
    } = props
    
    return(
        <div className={style.formButton}>
        <button 
            className={`${children && 'next'} ${size} ${color}  ${style.button}`} 
            onClick={action} 
            type={type} 
            disabled={disable}>
                
        {label}
        {children}
        </button>
        </div>
    )
}