import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import {FaPlus } from "react-icons/fa";

function CreateItem() {
    const [description, setDescription] = useState('');
    const [size, setSize] = useState('');
    const [condition, setCondition] = useState('');
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('');
    const navigate = useNavigate()

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    const Submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('description', description);
        formData.append('size', size);
        formData.append('condition', condition);
        formData.append('image', image);
        formData.append('location', location);

        axios.post("http://localhost:3001/createItem", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    .then(result => {
        console.log(result)
        navigate("/")
    })
    .catch(err => console.log(err));
};

    return (
        <div className="app-background d-flex flex-column vh-100 justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Submit}>
                    <h2 className='caption'>Cadastrar Peça</h2>

                    <div className="mb-2">
                        <label htmlFor="image">Imagem da Peça</label>
                        <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    
                    <div className="mb-2">
                        <label htmlFor="">Descrição</label>
                        <input type="text" placeholder="blusa, calça, sapato..." className="form-control" onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Tamanho</label>
                        <input type="text" placeholder="M, G 36, 48..." className="form-control" onChange={(e) => setSize(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Estado da Peça</label>
                        <input type="text" placeholder="novo, com marcas de uso..." className="form-control" onChange={(e) => setCondition(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Localização</label>
                        <input type="text" placeholder="Cidade, Estado" className="form-control" onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <button type="submit" className="btn submitButton"><FaPlus /></button>
                </form>
            </div>
        </div>
    )
}

export default CreateItem;
