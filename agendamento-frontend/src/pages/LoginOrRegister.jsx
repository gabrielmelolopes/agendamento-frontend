import { useNavigate } from "react-router-dom"

function LoginOrRegister() {
    const navigate = useNavigate()
    return <div>
        <button onClick={() => navigate('/login')}>Login</button>
        <br />
        <button onClick={() => navigate('/register')}>Register</button>
    </div>
}

export default LoginOrRegister