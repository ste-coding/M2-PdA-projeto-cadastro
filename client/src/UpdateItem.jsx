import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaPaperPlane } from "react-icons/fa";

function UpdateItem () {
    const {id} = useParams()
    const [description, setDescription] = useState('');
    const [size, setSize] = useState('');
    const [condition, setCondition] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3001/getUser/' +id)
        .then(result => {console.log(result)
                setDescription(result.data.description)
                setSize(result.data.size)
                setCondition(result.data.condition)

        })
        .catch(err => console.log(err))
    }, [])

    const Update =(e) => {
        e.preventDefault();
        axios.put("http://localhost:3001/updateItem/"+id, { description, size, condition })
            .then(result => {
                console.log(result)
                navigate("/")
            })
            
            .catch(err => console.log(err))
    }

    return(
        <div className="app-background d-flex flex-column vh-100 justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Update}>
                    <h2>Update Item</h2>
                    <div className="mb-2">
                        <label htmlFor="">Description</label>
                        <input type="description" placeholder="enter description of item" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Size</label>
                        <input type="size" placeholder="enter size of item" className="form-control" value={size} onChange={(e) => setSize(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Condition</label>
                        <input type="condition" placeholder="enter condition of use" className="form-control" value={condition} onChange={(e) => setCondition(e.target.value)}/>
                    </div>
                    <button className="btn updateButton"><FaPaperPlane /></button>
                </form>
            </div>
        </div>
    )
}

export default UpdateItem;