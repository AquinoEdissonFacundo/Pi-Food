import React from "react";
import { Link } from "react-router-dom";
import styles from './LandingPage.module.css';

export default function LandingPage(){
    return (
        <div className={styles.landing}>
        
            <h1 className={styles.bienvenido}>Bienvenido</h1>
            <Link to= '/home'>
                <div className={styles.background}>
                    <button className={styles.btn}></button>
                </div>
            </Link>
        </div>
       
    )
}