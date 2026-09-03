import './style.css'
import Trash from '../../assets/trash.svg'    // Importando o ícone da lixeira

function Home() {

  // Simulando um array de usuários para exibir na tela (sem conectar com o back end)
  const users = [{
    id: 'placeholder',
    name: 'Arthur',
    age: 23,
    email: 'arthur@email.com'
  },
  {
    id: 'placeholder2',
    name: 'Pedro',
    age: 24,
    email: 'pedro@email.com'
  },
  {
    id: 'placeholder3',
    name: 'Fábio',
    age: 48,
    email: 'fábio@email.com'
  }
  ]

  return (
    <>
      <div className="container">
        <form>
          <h1>Cadastro de Usuários</h1>
          <input type="text" placeholder="Nome" name="nome" />
          <input type="number" placeholder="Idade" name="idade" />
          <input type="email" placeholder="Email" name="email" />
          <button type="button">Cadastrar</button>
        </form>

        {users.map((user) => (
          <div key={user.id} className="card">
            <div>
              <p>Nome:  <span>{user.name}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>Email: <span>{user.email}</span></p>
            </div>
            <button>
              <img src={Trash} alt="Lixeira" />
            </button>
          </div>
        ))}

      </div>
    </>
  )
}

export default Home
