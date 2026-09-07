import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { API_URL } from "../config/env"

function Register() {
    const [email, setEmail] = useState('')
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const [tipoUsuario, setTipoUsuario] = useState('')
    const navigate = useNavigate()
    async function handleRegister(e) {
        e.preventDefault()

        if (!tipoUsuario) {
            alert("Selecione um tipo de usuário")
            return
        }
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                nome,
                senha,
                tipoUsuario
            })
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error()
        }
        setEmail('')
        setNome('')
        setSenha('')
        setTipoUsuario('')
        localStorage.setItem('token', data.token)
        navigate("/home")
    }
    return (
        <div>
            <h3>Registro de Usuário</h3>
            <form onSubmit={handleRegister}>
                <input placeholder="E-mail"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                <input placeholder="Nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)} />
                <input placeholder="Senha"
                    type="password"
                    value={senha}
                    onChange={e => setSenha(e.target.value)} />
                <select value={tipoUsuario} onChange={e => setTipoUsuario(e.target.value)}>
                    <option value="">Tipo de Usuário</option>
                    <option value="PACIENTE">Paciente</option>
                    <option value="MEDICO">Médico</option>
                </select>
                <button type="submit">Registrar</button>
            </form>
        </div>
    )
}

export default Register