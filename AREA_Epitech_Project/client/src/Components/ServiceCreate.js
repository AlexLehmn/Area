import React, { useState } from 'react';
import './Service.css';
// import { Link } from "react-router-dom";
import Modal from './Modal';
import Navbar from '../Components/Navbar';
import AddBox from './AddBox';
import randomColor from "randomcolor";

function ServiceCreate() {
    const [modalOpen, setModalOpen] = useState(false);
    const [val, setVal] = useState([]);
    const [color, setcolor] = useState("")

    const handleAdd = () => {
        const abc = [...val, []]
        setVal(abc)
        setcolor(randomColor())
    }
    const handleDelete = (i) => {
        const deletVal = [...val]
        deletVal.splice(i, 1)
        setVal(deletVal)
    }


    return (
        <div className="ServiceCreate">
            <Navbar></Navbar>
            <h1 id="title">My Services</h1>
            <br></br>
            <button className="button button14" onClick={() => { setModalOpen(true); handleAdd();}}>Create Service</button>
            {modalOpen && <Modal setOpenModal={setModalOpen} />}
            <div className='Square'>
                {val.map((data, i) => {
                    return (
                        <div className='Box frame' value={data} style={{
                            backgroundColor: color
                        }} >
                            <h1> You have created A Service with {window.name}</h1>
                            <button class="custom-btn btn-1" st onClick={() => handleDelete(i)}>DELETE</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ServiceCreate;