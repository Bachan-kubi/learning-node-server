import React, { useState } from 'react';

const AddUsers = () => {
    const [user, setUser] = useState({});
    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log(user);
        fetch('http://localhost:5000/users', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.acknowledged){
                alert('User Added!');
                event.target.reset();
            }
        })
    };

    const handleInputBlur=(event)=>{
        const value = event.target.value;
        const field = event.target.name;
        const newUser = {...user};
        newUser[field] = value;
        setUser(newUser);
    };

    return (
        <div>
            <h2>Please add Users!</h2>
            <form onSubmit={handleSubmit}>
                <input onChange={handleInputBlur} type="text" name='name' placeholder='Name' required /> <br />
                <input onChange={handleInputBlur} type="text" name='adress' placeholder='Adress' required /> <br />
                <input onChange={handleInputBlur} type="email" name='email' placeholder='Email' required/> <br />
                <button type='submit'>Add User</button>
            </form>
        </div>
    );
};

export default AddUsers;