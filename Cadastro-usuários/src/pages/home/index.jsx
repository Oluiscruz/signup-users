import './style.scss'
import { FaTrashCan } from "react-icons/fa6";
import { useEffect, useState, useRef } from 'react';
import api from '../../services/api'

export default function Home() {

  const [users, setUsers] = useState([])

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {

    const usersFromApi = await api.get('/usuarios');

    setUsers(usersFromApi.data);
  };
  
  async function createUsers() {
    
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    });
    
    getUsers()
  };

  async function deleteUsers(id) {

    await api.delete(`/usuarios/${id}`);

    getUsers()
  };
  

  useEffect(() => {
    getUsers()
  }, []);

  return (
    <div className="container">
      <div className="form">
        <h1>Cadastro de usuários</h1>
        <input type="text" name="nome" id="" placeholder='Nome' ref={inputName} />
        <input type="number" name="idade" id="" placeholder='Idade' ref={inputAge} />
        <input type="email" name="email" id="" placeholder='Email' ref={inputEmail} />
        <button className="btn" type="button" onClick={createUsers}>Cadastrar</button>
      </div>

      {users.map(user => (
        <section key={user.id} className='box'>

          <div className="left">
            <p>Nome:  <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button className='rigth' onClick={() => deleteUsers(user.id)}>
            <i><FaTrashCan /></i>
          </button>

        </section>
      ))}




    </div>
  )
};
