import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import {FaPlus } from "react-icons/fa";

function CreateItem() {
    const [description, setDescription] = useState('');
    const [size, setSize] = useState('');
    const [condition, setCondition] = useState('');
    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/createItem", { description, size, condition })
            .then(result => {
                console.log(result)
                navigate("/")
            })
            
            .catch(err => console.log(err))
    }

    return (
        <div className="app-background d-flex flex-column vh-100 justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Submit}>
                    <h2>Cadastrar Peça</h2>
                    <div className="mb-2">
                        <label htmlFor="">Descrição</label>
                        <input type="text" placeholder="blusa, calça, sapato..." className="form-control" onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Size</label>
                        <input type="text" placeholder="M, G 36, 48..." className="form-control" onChange={(e) => setSize(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Estado da Peça</label>
                        <input type="text" placeholder="novo, com marcas de uso..." className="form-control" onChange={(e) => setCondition(e.target.value)} />
                    </div>
                    <button type="submit" className="btn submitButton"><FaPlus /></button>
                </form>
            </div>
        </div>
    )
}

export default CreateItem;
