import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaPaperPlane } from "react-icons/fa";

function UpdateItem () {
    const {id} = useParams()
    const [description, setDescription] = useState('');
    const [size, setSize] = useState('');
    const [condition, setCondition] = useState('');
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3001/getUser/' +id)
        .then(result => {console.log(result)
                setDescription(result.data.description)
                setSize(result.data.size)
                setCondition(result.data.condition)
                setLocation(result.data.location);

        })
        .catch(err => console.log(err))
    }, [])

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };    

    const Update = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('description', description);
        formData.append('size', size);
        formData.append('condition', condition);
        if(image) formData.append('image', image);
        formData.append('location', location);
    
        axios.put("http://localhost:3001/updateItem/" + id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result => {
            console.log(result);
            navigate("/");
        })
        .catch(err => console.log(err));
    };

    return(
        <div className="app-background d-flex flex-column vh-100 justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Update}>
                    <h2 className='caption'>Atualizar Peça</h2>
                    <div className="mb-2">
                        <label htmlFor="image">Imagem</label>
                        <input type="file" className="form-control" onChange={handleFileChange} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Descrição</label>
                        <input type="description" placeholder="enter description of item" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Tamanho</label>
                        <input type="size" placeholder="enter size of item" className="form-control" value={size} onChange={(e) => setSize(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Estado da peça</label>
                        <input type="condition" placeholder="enter condition of use" className="form-control" value={condition} onChange={(e) => setCondition(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Localização</label>
                        <input type="text" placeholder="Cidade, Estado" className="form-control" onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <button className="btn updateButton"><FaPaperPlane /></button>
                </form>
            </div>
        </div>
    )
}

export default UpdateItem;