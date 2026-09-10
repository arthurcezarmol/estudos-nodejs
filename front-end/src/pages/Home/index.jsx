import { useEffect, useState, useRef } from 'react'             // O useEffect serve para fazer a requisição quando a página for carregada
import './style.css'
import Trash from '../../assets/trash.svg'    // Importando o ícone da lixeira
import api from '../../services/api'          // Importando a conexão com o back end

function Home() {
  // Criando um estado para armazenar os usuários que vieram do back end
  const [users, setUsers] = useState([]);    

  // Criando uma referência para o formulário, para poder pegar os valores dos inputs 
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  // É uma função assíncrona, pois vai fazer uma requisição para o back end e vai voltar (pode demorar)
  async function getUsers() {
    // Fazendo a requisição para o back end, buscando os usuários (passa o endereço da rota que está no back end)
    const usersFromApi = await api.get('/usuarios');

    // Pegando somente os dados que vieram do back end e armazenando na variável users
    setUsers(usersFromApi.data);      
  }

  // Função para criar um novo usuário, que vai ser chamada quando o usuário clicar no botão de cadastrar
  async function createUser() {
    await api.post('/usuarios', {
      name: inputName.current.value,        // Pegando o valor do input de nome
      age: inputAge.current.value,          // Pegando o valor do input de idade
      email: inputEmail.current.value       // Pegando o valor do input de email
    })

    // Chamando a função que busca os usuários no back end, para atualizar a lista de usuários na tela
    getUsers();
  }

  // Função para deletar um usuário, que vai ser chamada quando o usuário clicar no botão de deletar
  async function deleteUser(id) {
    await api.delete(`/usuarios/${id}`);        // Passando o id do usuário que vai ser deletado

    // Chamando a função que busca os usuários no back end, para atualizar a lista de usuários na tela
    getUsers();
  }

  // Tudo que estiver dentro do useEffect vai ser executado quando a página for carregada, ou seja, quando o componente for montado
  useEffect(() => {
    // Chamando a função que busca os usuários no back end
    getUsers()   
  }, [])

  return (
    <>
      <div className="container">
        <form>
          <h1>Cadastro de Usuários</h1>
          <input type="text" placeholder="Nome" name="nome" ref={inputName} />
          <input type="number" placeholder="Idade" name="idade" ref={inputAge} />
          <input type="email" placeholder="Email" name="email" ref={inputEmail} />
          <button type="button" onClick={createUser}>Cadastrar</button>
        </form>

        {users.map((user) => (
          <div key={user.id} className="card">
            <div>
              <p>Nome:  <span>{user.name}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>Email: <span>{user.email}</span></p>
            </div>
            <button onClick={() => deleteUser(user.id)}>
              <img src={Trash} alt="Lixeira" />
            </button>
          </div>
        ))}

      </div>
    </>
  )
}

export default Home
