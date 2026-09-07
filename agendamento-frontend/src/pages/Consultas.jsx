import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { API_URL } from "../config/env"

function Consultas() {
    const [idMedico, setIdMedico] = useState(0)
    const [idPaciente, setIdPaciente] = useState(0)
    const [dataHora, setDataHora] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    async function handleConsulta(e) {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch(`${API_URL}/consultas`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    medico: { id: Number(idMedico) },
                    paciente: { id: Number(idPaciente) },
                    dataHora: dataHora ? new Date(dataHora).toISOString() : null
                })
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Falha ao reailzar consulta")
            }
            alert("Consulta marcada.")
            navigate("/home")
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return <div>Consultas
        <form onSubmit={handleConsulta}>
            <h4>Id do Médico</h4>
            <input placeholder="Id do Médico"
                type="number"
                min={0}
                value={idMedico}
                onChange={e => setIdMedico(e.target.value)} />
            <h4>Id do Paciente</h4>
            <input placeholder="Id do Paciente"
                type="number"
                min={0}
                value={idPaciente}
                onChange={e => setIdPaciente(e.target.value)} />
            <h4>Horário à marcar</h4>
            <input type="datetime-local"
                value={dataHora}
                onChange={e => setDataHora(e.target.value)} />
            <br />
            <button type="submit" disabled={loading}>
                {loading ? "Agendando..." : "Enviar"}
            </button>
        </form>
    </div>
}

export default Consultas