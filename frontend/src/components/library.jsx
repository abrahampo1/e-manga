import { useEffect, useState } from "react"
import db from "../api/db"
import Manga from "./manga"

const Library = ()=>{
    const [mangas, setMangas] = useState([])
    useEffect(()=>{
        let p = async ()=>{
            await db.read()
            setMangas(Object.values(db.data.library))
        }
        p()
    }, [])
    return <>
        <p className="font-bold text-4xl">My Library</p>
        <div className="flex-wrap mt-2  grid gap-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 grid-cols-4">
            {mangas.map((manga, key)=>{
                return <Manga manga={manga} key={key}/>
                
            })}
        </div>
    </>
}

export default Library