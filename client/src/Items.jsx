import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaPlusCircle, FaPen, FaMinusCircle, FaFilter } from "react-icons/fa"; // Importe FaFilter
import logo from './assets/logo-thriftopia.png';

function Items() {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar a visibilidade da barra lateral

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(result => setItems(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteItem/' + id)
            .then(() => window.location.reload())
            .catch(err => console.error(err));
    };

    const handleSizeChange = (size) => {
        if (selectedSizes.includes(size)) {
            setSelectedSizes(selectedSizes.filter(s => s !== size));
        } else {
            setSelectedSizes([...selectedSizes, size]);
        }
    };

    return (
        <div className="app-background">
            <div className="logo-container">
                <img src={logo} alt="Thriftopia Logo" />
            </div>
            <h1>Thriftopia: magia em cada peça</h1>
            <h4>Cadastre suas peças para doação</h4>
            <div className="controls">
                <Link to="/create" className='btn addButton'><FaPlusCircle className="icon-plus" /></Link>
                <FaFilter className="filter-icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            </div>
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <input
                    type="text"
                    placeholder="Buscar por descrição..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
                <div>
                    {["P", "M", "G", "GG", "36", "38", "40", "42", "44", "46", "48"].map((size) => (
                        <div key={size} className="size-filter">
                            <input
                                type="checkbox"
                                id={`size-${size}`}
                                checked={selectedSizes.includes(size)}
                                onChange={() => handleSizeChange(size)}
                            />
                            <label htmlFor={`size-${size}`}>{size}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="cards-container">
                {items.filter((item) => {
                    return (selectedSizes.length === 0 || selectedSizes.includes(item.size)) &&
                        item.description.toLowerCase().includes(searchTerm.toLowerCase());
                }).map((item) => (
                    <div key={item._id} className="card mb-3">
                        <div className="card-body">
                            <img className="card-image" src={`http://localhost:3001/${item.imageUrl}`} alt="Item" style={{ width: '100%', height: 'auto' }} />
                            <h5 className="card-title"><strong>Descrição:</strong> {item.description}</h5>
                            <p className="card-text"><strong>Tamanho:</strong> {item.size}</p>
                            <p className="card-text"><strong>Estado da peça:</strong> {item.condition}</p>
                            <div className="d-flex justify-content-end">
                                <Link to={`/update/${item._id}`} className='btn editButton'><FaPen /></Link>
                                <button className='btn deleteButton' onClick={() => handleDelete(item._id)}><FaMinusCircle /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Items;
