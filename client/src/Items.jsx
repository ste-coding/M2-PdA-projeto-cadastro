// ./client/src/Items.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaPlusCircle , FaPen , FaMinusCircle  } from "react-icons/fa";
import logo from './assets/logo-thriftopia.png';
function Items() {
    const [items, setItems] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(result => setItems(result.data))
            .catch(err => console.log(err));

    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteItem/' + id)
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch(err => res.json(err))
    }

    return (
        <div className="app-background d-flex flex-column vh-100 justify-content-center align-items-center">
            <div className="items-container">
                <div className="logo-container">
                    <img src={logo} alt="Thriftopia Logo" className="logo" />
                </div>
                <h1>Thriftopia: magia em cada peça</h1>
                <h4>Cadastre suas peças para doação</h4>
                <div className="buttonContainer">
                    <Link to="/create" className='btn addButton'><FaPlusCircle  className="buttonIcon" /></Link>
                </div>
                <div className="cards-container">
                    {items.map((item) => (
                        <div key={item._id} className="card mb-3">
                            <div className="card-body">
                                <img className="card-image" src={`http://localhost:3001/${item.imageUrl}`} alt="Item" style={{ width: '100%', height: 'auto' }} />
                                <h5 className="card-title"><strong>Descrição:</strong> {item.description}</h5>
                                <p className="card-text"><strong>Tamanho:</strong> {item.size}</p>
                                <p className="card-text"><strong>Estado da peça:</strong> {item.condition}</p>
                                <div className="d-flex justify-content-end">
                                    <Link to={`/update/${item._id}`} className='btn editButton'><FaPen className="buttonIcon" /></Link>
                                    <button className='btn deleteButton' onClick={() => handleDelete(item._id)}><FaMinusCircle className="buttonIcon" /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    )
}

export default Items;