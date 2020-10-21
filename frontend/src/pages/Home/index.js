import React, { useEffect, useState } from 'react';

import api from '../../services/api';

const Home = () => {

  const [posts, setPosts] = useState([]);

  const updatePostList = () => {
    api.get('posts').then((response) => {
      setPosts(response.data);
    })
  }

  useEffect(() => {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMCIsImlhdCI6MTYwMzMxMzg1NCwibmJmIjoxNjAzMzEzODU0LCJleHAiOjE2MDM5MTg2NTQsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19._gNYbm5uuaQmuh-pvu3Z-bjiJ41GkF-EA_6gAC_e8lg';
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    (async () => {
      const {data} = await api.get('posts', config);
      setPosts(data);
    })();

  }, []);

  return (
    <>
      <h1>Lista de posts</h1>
      <button onClick={updatePostList} className='btn'>Listar usuários</button>
      <ul>
        {
          posts.map(post => (
            <li key={post.id}>{post.title.rendered}</li>
          ))
        }
      </ul>
    </>
  )
}
  

export default Home;
