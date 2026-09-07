import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { API_URL } from "../config/env"

function Home() {
    const navigate = useNavigate()
    const [nomeUser, setNomeUser] = useState('')
    const [tipoUsuario, setTipoUsuario] = useState('')
    const [id, setId] = useState(0)
    const [consultas, setConsultas] = useState([])

    function logout() {
        localStorage.removeItem('token')
        navigate("/welcome")
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate("/welcome")
            return
        }

        async function loadUser() {
            try {
                const response = await fetch(`${API_URL}/auth/me`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                const data = await response.json()
                if (!response.ok) {
                    throw new Error("Erro: Usuário não encontrado.")
                }
                setNomeUser(data.nome)
                setId(data.id)
                setTipoUsuario(data.tipoUsuario)
            } catch (err) {
                alert(err.message)
                logout()
            }
        }
        loadUser()
    }, [navigate])

    useEffect(() => {
        async function loadConsultas() {
            if (!id || id === 0) return

            try {
                const endpoint = tipoUsuario === 'MEDICO'
                    ? `/consultas/medico/${id}`
                    : `/consultas/paciente/${id}`

                const response = await fetch(`${API_URL}${endpoint}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                })
                const data = await response.json()

                if (!response.ok) {
                    throw new Error("Erro ao buscar consultas.")
                }
                setConsultas(data)
            } catch (error) {
                alert(error.message)
            }
        }

        loadConsultas()
    }, [tipoUsuario, id])

    return (
        <div>
            <h2>Home</h2>
            <h3>Bem-vindo, {nomeUser}!</h3>
            <p><strong>Perfil:</strong> {tipoUsuario}</p>
            <br />
            <div>
                <button onClick={() => navigate('/consultas')}>+ Nova Consulta</button>
            </div>
            <br />
            <h4>Consultas Marcadas</h4>
            <br />
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Data/Hora</th>
                        <th>Médico</th>
                        <th>Paciente</th>
                    </tr>
                </thead>
                <tbody>
                    {consultas.length === 0 ? (
                        <tr>
                            <td colSpan="3">Nenhuma consulta encontrada.</td>
                        </tr>
                    ) : (
                        consultas.map((consulta) => (
                            <tr key={consulta.id || consulta.dataHora}>
                                <td>{new Date(consulta.dataHora).toLocaleString('pt-BR')}</td>
                                <td>{consulta.medico?.nome || 'N/A'}</td>
                                <td>{consulta.paciente?.nome || 'N/A'}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <br />
            <button onClick={logout}>Sair / Logout</button>
        </div>
    )
}

export default Home