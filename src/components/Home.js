import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUsers, setDispalyUsers] = useState(users);

    const handleDelete=(user)=>{
        const agree = window.confirm(`Are u Sure?: ${user.name}`);
        if(agree){
            // console.log('users deleted!:', user._id);
            fetch(`http://localhost:5000/users/${user._id}`, {
                method: 'DELETE'
            })
            .then(res=>res.json())
            .then(data=>{
                // console.log(data)
                if(data.deletedCount>0){
                    const remainingUser = displayUsers.filter(usr=>usr._id !== user._id);
                    setDispalyUsers(remainingUser);
                    alert('ur target achieved!');
                }
            })
        }
    }
    return (
        <div>
            <h3>Users: {displayUsers.length}</h3>
            <div>
                {displayUsers.map(user=><h3 key={user._id}>
                    {user.name}
                    {user.email}
                    <Link to={`/update/${user._id                                                                                   }`}><button>Update</button></Link>
                    <button onClick={()=>handleDelete(user)}>X</button>
                    </h3>
                    
                )}
            </div>
        </div>
    );
};

export default Home;