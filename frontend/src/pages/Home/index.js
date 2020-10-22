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
    const token = 'seu-token';
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
      <button onClick={updatePostList} className='btn'>Atualizar posts</button>
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
