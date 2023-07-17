import React from "react";
import styles from './Card.module.css'

export default function Card ({title, image, TypeDiets ,id}) {
return (
    <div key={id} className={styles.card}>
        <div className={styles.cd}>
        <h3>{title}</h3>
        <img className={styles.cardImg} src={image} alt={title} />
        <div className={styles.tipes}>  
        {TypeDiets?.map(t => <h5> {t.name}</h5>)}  
        </div> 
        </div>
    </div>
)}