import style from './index.module.scss'

interface operationSate{
    status : number
    message : string
}

export default function OperationSate(props: operationSate) {
    const {message, status} = props

    const getStatusElements = () => {
        switch(status){
            case 200 :
                return {theme: "green", label: "success", message: message }
            case 400 : 
                return {theme: "orange", label: "request_error", message: message }
            case 404 : 
                return {theme: "orange", label: "error", message: message }
            case 405 : 
                return {theme: "red", label: "request_error", message: message }
            case 409 : 
                return {theme: "orange", label: "conflict", message: message }
            case 422 : 
                return {theme: "red", label: "request_error", message: message }
            default:
                return {theme: "red", label: status.toString() , message: "an_error_occurred"}
        }
    }
    

    const dataElement = getStatusElements()

    return (
        <div className={`${style.OperationSate} ${dataElement.theme}`}>
                <i className="material-icons">info</i>
                <div className={style.message}>
                    <span className="" style={{fontWeight: "700"}}>
                        {dataElement.label}
                    </span> <br />
                    <span>
                        {dataElement.message}
                    </span>
                </div>
            </div>
    )
    
}