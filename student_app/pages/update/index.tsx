import style from './index.module.scss'
import FormButton from '@/src/components/Form/FormButton'
import FormTextField from '@/src/components/Form/FormField'
import { useForm } from 'react-hook-form';
import apis, { updateStudentById } from '../api';
import { useRouter } from 'next/router';
import { use, useEffect, useState } from 'react';
import OperationSate from '@/src/components/OperationsState';


export default function Listing(props: any){
    const router = useRouter()
    const { student } = router.query
    const [activeStudent, setActiveStudent] = useState<any|undefined>(undefined)
    const [migrationStatus, setMigrationStatus] = useState<undefined | any>(undefined)
    const [message, setMessage] = useState<undefined | any>(undefined)
    const [showMessage, setShowMessage] = useState(false)

    const activeData = async (id: any) => {
        try {
            const result = await apis.getStudentById(id)
            setActiveStudent(result.data.data)
            return result
        }
        catch(e) {console.log(e)}
    }

    const { 
        register,
        handleSubmit,
        setValue,
        formState: {errors}
      } = useForm({});

      useEffect(() => {
        
        if(student) {
        activeData(student)
        }
      }, [student])
      
      useEffect(() => {
        if(student) {
            const date = new Date(activeStudent?.date_of_birth);
            const formattedDate = date.toISOString().substr(0, 10);
            setValue('first_name', activeStudent?.first_name)
            setValue('name', activeStudent?.name)
            setValue('grade', activeStudent?.grade)
            setValue('sex', activeStudent?.sex)
            setValue('date_of_birth', formattedDate)
            setValue('address', activeStudent?.address)
            setValue('postal_code', activeStudent?.postal_code)
            setValue('town', activeStudent?.town)
            }
      }, [activeStudent])

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
      
        updateStudentById(student, payload)
          .then(response => {
            console.log(response.data.message)
            setMessage(response.data.message);
            setMigrationStatus(response.status)
          })
          .catch(error => {
            console.error(error);
          });
      };

      useEffect(() => {
        if(message){
            setShowMessage(true)

            if(migrationStatus == 200){
                setTimeout(() => {
                    router.replace('/students');
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
                Edit Student
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