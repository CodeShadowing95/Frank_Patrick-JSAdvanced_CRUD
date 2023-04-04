import style from './index.module.scss'
import FormButton from '@/src/components/Form/FormButton'
import FormTextField from '@/src/components/Form/FormField'
import { useForm } from 'react-hook-form';
import { insertStudent } from '../api';
import { useRouter } from 'next/router';
import {  useEffect, useState } from 'react';
import OperationSate from '@/src/components/OperationsState';


export default function Listing(props: any){
    const router = useRouter()
    const [migrationStatus, setMigrationStatus] = useState<undefined | any>(undefined)
    const [message, setMessage] = useState<undefined | any>(undefined)
    const [showMessage, setShowMessage] = useState(false)

    const { 
        register,
        handleSubmit,
        formState: {errors}
      } = useForm();

      const  onSubmit = async (data: any) => {
        const payload = {
          first_name: data.first_name,
          name: data.name,
          grade: data.grade,
          sex: data.sex,
          date_of_birth: data.date_of_birth,
          address: data.address,
          postal_code: data.postal_code,
          town: data.town,
        };
      
        insertStudent(payload)
          .then(response => {
            setMessage(response.data.message);
            setMigrationStatus(response.status)
            console.log(response)
          })
          .catch(error => {
            console.error(error);
          });
      };

      useEffect(() => {
        if(message){
            setShowMessage(true)

            if(migrationStatus == 201){
                setTimeout(() => {
                    router.push('/students');
                  }, 2000);
            }

            else{
                setTimeout(() => {
                    setShowMessage(false)
                  }, 8000);
            }
        }
      })

    return <div className={style.center}>
        {
              showMessage &&
              <OperationSate 
                message={message}
                status={migrationStatus}
              />
          }
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className={style.form}>

            <h1 className={style.formTitle}>
                New Student
            </h1>

            <div className={style.formCorp}>
                
                <FormTextField 
                    name={'first_name'} 
                    id={'first_name'} 
                    type={"text"}
                    label={"first name"} 
                    error={errors}
                    placeholder="Student's first name"
                    register={register}/>

                
                <FormTextField 
                    name={'name'} 
                    id={'name'} 
                    type={"text"}
                    label={"name"} 
                    error={errors}
                    placeholder="Student's name"
                    register={register}/>

                
                <FormTextField 
                    name={'grade'} 
                    id={'grade'} 
                    type={"text"}
                    label={"grade"} 
                    error={errors}
                    placeholder="Student's grade"
                    register={register}/>

                
                <FormTextField 
                    name={'sex'} 
                    id={'sex'} 
                    type={"text"}
                    label={"sex"} 
                    placeholder="Student's sex"
                    register={register}/>

                <FormTextField 
                    name={'date_of_birth'} 
                    id={'date_of_birth'} 
                    type={"date"}
                    label={"Born on"} 
                    placeholder="Student's birthday"
                    register={register}/>

                <FormTextField 
                    name={'address'} 
                    id={'address'} 
                    type={"text"}
                    label={"address"} 
                    placeholder="Student's address"
                    register={register}/>

                <FormTextField 
                    name={'postal_code'} 
                    id={'postal_code'} 
                    type={"text"}
                    label={"postal code"} 
                    placeholder="Student's postal code"
                    register={register}/>

                <FormTextField 
                    name={'town'} 
                    id={'town'} 
                    type={"text"}
                    label={"town"} 
                    placeholder="Student's town"
                    register={register}/>

                <FormButton type={"submit"} label={'submit'} size={'full'} color={'primary'}/>
            </div>
        </form>
    </div>
}