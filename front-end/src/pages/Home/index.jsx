import './style.css'

function Home() {

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

        <div>
          
        </div>
      </div>
    </>
  )
}

export default Home
