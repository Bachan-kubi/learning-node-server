import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData();
    const [user, setUser] = useState(storedUser);

    const handleUpdate = (event)=>{
        event.preventDefault();
        // console.log(user);
        fetch(`http://localhost:5000/users/${storedUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount>0){
                alert('your name updated!');
                event.target.reset();
                console.log(data);
            }
        })
    };

    const handleInputChange=(event)=>{
        const value = event.target.value;
        const field = event.target.name;
        const newUser = {...user};
        newUser[field] = value;
        setUser(newUser);
    };

    return (
        <div>
            <h2>Please Update Users: {storedUser.name}</h2>
            <form onSubmit={handleUpdate}>
                <input onChange={handleInputChange} defaultValue={storedUser.name} type="text" name='name' placeholder='Name' required /> <br />
                <input onChange={handleInputChange} defaultValue={storedUser.adress} type="text" name='adress' placeholder='Address' required /> <br />
                <input onChange={handleInputChange} defaultValue={storedUser.email} type="email" name='email' placeholder='Email' required/> <br />
                <button type='submit'>Update User</button>
            </form>
        </div>
    );
};

export default Update;