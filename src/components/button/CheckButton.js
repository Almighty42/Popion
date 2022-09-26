// React
import React from 'react'
// Icons
import CheckIcon from 'src/assets/SVGR/CheckIcon'

const CheckButton = ({ setOpen, setOpen2, onImageLoad }) => {
    return (
        <>
            <button onClick={() => { setOpen(false); setOpen2(false);onImageLoad() }} className='checkButton' > <CheckIcon /> </button>
        </>
    )
}

export default CheckButton