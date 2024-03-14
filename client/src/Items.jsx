import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaPlusCircle, FaPen, FaMinusCircle, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import logo from './assets/logo-thriftopia.png';

function Items() {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchLocation, setSearchLocation] = useState('');

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
        <div className="main-container">
            <div className="logo-container">
                <img src={logo} alt="Thriftopia Logo" />
            </div>
            <div className='titles'>
                <h1 className='title'>Thriftopia</h1>
                <h2 className='subtitle'>magia em cada peça</h2>
            </div>
            

            <div className="add-button-container">
                <Link to="/create" className="add-button">
                    <FaPlusCircle className="icon-plus" /> Cadastre sua peça para doação
                </Link>
            </div>
                <FaSearch className="search-icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <div className="search-field">
                    <FaSearch id="description-icon" />
                    <input
                        className='search-description'
                        type="text"
                        placeholder="Buscar por descrição"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                </div>
                <div className="search-field">
                    <FaMapMarkerAlt id="location-icon" />
                    <input
                        className='search-description'
                        type="text"
                        placeholder="Buscar por localização"
                        onChange={(e) => setSearchLocation(e.target.value)}
                        value={searchLocation}
                    />
                </div>

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
                        item.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
                        (item.location?.toLowerCase() ?? "").includes(searchLocation.toLowerCase());
                }).map((item) => (
                    <div key={item._id} className="card mb-3">
                        <div className="card-body">
                            <div className="card-image-container">
                                <img className="card-image" src={`http://localhost:3001/${item.imageUrl}`} alt="Item" style={{ width: '100%', height: 'auto' }} />
                            </div>
                            <h5 id="card-title">{item.description}</h5>
                            <p className="card-text"><strong>Tamanho:</strong> {item.size}</p>
                            <p className="card-text"><strong>Estado da peça:</strong> {item.condition}</p>
                            <p className="card-text card-location"> {item.location}</p>

                            <div className="d-flex justify-content-end">
                                <Link to={`/update/${item._id}`} className='btn edit-button'><FaPen /></Link>
                                <button className='btn delete-button' onClick={() => handleDelete(item._id)}><FaMinusCircle /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Items;
