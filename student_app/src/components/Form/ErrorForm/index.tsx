import React from 'react';
import style from './index.module.scss'

export default function ErrorForm(props: any){
  const {message} = props
    return (
        <div className={`bodyRegular flex redBg redC ${style.error}`}>
          <i className= {`material-icons`} style={{marginRight: "0.5em", fontSize: "1.5em"}}>warning</i>
          <span>
          {
            message != undefined && message != "" ?
            message :
            "field required"
          }
        </span>
        </div>
    )
}