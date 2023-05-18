import React from 'react'
import styles from './dashboard.module.css'

import folderIcon from './folder.png'

export default function Folder(props) {
    return (
        <div className={`col-lg-1 col-md-3 col-sm-4 col-xs-6 ${styles.folder}`}>
            <a href="">
                <img src={folderIcon} alt={props.alt} className='w-100' />
                <p>{props.folderName}</p>
            </a>
        </div>
    )
}
