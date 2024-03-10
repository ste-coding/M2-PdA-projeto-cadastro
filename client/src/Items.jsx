import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'



function Items () {
    const [items, setItems] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001')
        .then(result => setItems(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteItem/'+id)
        .then(res => {console.log(res)
            window.location.reload()})
        .catch(err => res.json(err))
    }



    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/create" className='btn btn-success'>Add +</Link>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Size</th>
                        <th>Condition</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item) =>{
                                return <tr>
                                    <td>{item.description}</td>
                                    <td>{item.size}</td>
                                    <td>{item.condition}</td>
                                    <td>
                                    <Link to={`/update/${item._id}`} className='btn btn-success'>Update</Link>
                                        <button className='btn btn-danger' onClick={(e) => handleDelete(item._id)}>Delete</button>
                                        </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Items;