import data from '../../fakeData.json'
import style from './index.module.scss'
import style2 from '../../styles/Home.module.scss'
import { useState, useEffect } from 'react'
import apis from '../api'
import FormButton from '@/src/components/Form/FormButton'
import Link from 'next/link';
import { useRouter } from 'next/router'

export default function Listing(student: any){
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(true)
    const [students, setStudents] = useState([])
    const [active, setActive] = useState<any|undefined>(undefined)
    const [activeStudent, setActiveStudent] = useState<any|undefined>(undefined)
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const result = await apis.getAllStudents()
                setStudents(result.data.data)
                setIsLoading(false)
            }

            catch(e) {console.log(e)}
        }
        fetchData()
    }, [])


    const activeData = async (id: any) => {
        try {
            const result = await apis.getStudentById(id)
            setActiveStudent(result.data.data)
            console.log(result)
        }
        catch(e) {console.log(e)}
    }

    useEffect(() => {
        if(active){
            activeData(active)
        }
    },[active])

    const deleteUser = (event: any) => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the student ${activeStudent.name} permanently?`,
            )
        ) {
            apis.deleteStudentById(active)
            window.location.reload()
        }
    }


    return <div className={style.container}>
        <div className={style.aside}>
        {
            students.map((student:any, index:any) => 
            <div 
                key={index}
                className={style2.card}
                style={{lineHeight: "2em"}}
                onClick={() => {setActive(student._id)}}
                >
            <span><span style={{ fontWeight: 600 }}>Name: </span> {student.name}</span> <br />
            <span><span style={{ fontWeight: 600 }}>Grade: </span> {student.grade}</span> <br />
            <span><span style={{ fontWeight: 600 }}>Address: </span> {student.address}</span> <br />
            <span><span style={{ fontWeight: 600 }}>Postal code: </span> {student.postal_code} {student.town}</span> 
            </div>

            )
          }
        </div>

        <div className={style.cardViewer}>

                {
                    activeStudent && 
                <div className={style.card}>
                    <div className={style.cardInfo}>
                        <div className={style.liElement}>
                            <span> First Name</span>
                            <span>{activeStudent.first_name}</span>
                        </div>
                        <div className={style.liElement}>
                            <span> Last Name</span>
                            <span>{activeStudent.name}</span>
                        </div>
                        <div className={style.liElement}>
                            <span> Grade</span>
                            <span>{activeStudent.grade}</span>
                        </div>
                        <div className={style.liElement}>
                            <span> Gender</span>
                            <span>{activeStudent.sex}</span>
                        </div>
                        <div className={style.liElement}>
                            <span> Born on</span>
                            <span>{(new Date(activeStudent.date_of_birth).toISOString().substr(0, 10))}</span>
                        </div>
                        <div className={style.liElement}>
                            <span> Address</span>
                            <span>{activeStudent.address}</span>
                        </div>
                        <div className={style.liElement}>
                            <span> Postal code</span>
                            <span>{activeStudent.postal_code}</span>
                        </div>
                        <div className={style.liElement}>
                            <span> Town</span>
                            <span>{activeStudent.town}</span>
                        </div>

                        <div style={{display: 'flex'}}>
                            <FormButton 
                                type={"button"} 
                                size={''}
                                color={'primary'} 
                                label={'Edit'}
                                action={()=>{router.push(`/update?student=${active}`)}}
                                ></FormButton>
                            <FormButton type={"button"} size={''} color={'red'} label={'Delete'} action={deleteUser}></FormButton>
                        </div>
                    </div>

                </div>
                }
            
        </div>
    </div>
}