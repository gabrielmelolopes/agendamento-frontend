import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
    const API_URL = 'http://localhost:8080/auth'
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha })
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Falha ao realizar login")
            }
            localStorage.setItem('token', data.token)
            setEmail('')
            setSenha('')
            navigate("/home")
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <div>
            <h3>Login de Usuário</h3>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="E-mail de Usuário"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    required
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}

export default Login