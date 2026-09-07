import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Consultas() {
    const API_KEY = 'http://localhost:8080/consultas'
    const [idMedico, setIdMedico] = useState(0)
    const [idPaciente, setIdPaciente] = useState(0)
    const [dataHora, setDataHora] = useState('')
    const navigate = useNavigate()
    function handleConsulta(e) {
        e.preventDefault()

        fetch(`${API_KEY}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                medico: { id: Number(idMedico) },
                paciente: { id: Number(idPaciente) },
                dataHora: dataHora
            })
        }).then(response => {
            if (response.ok) {
                navigate("/home")
                setIdMedico(0)
                setIdPaciente(0)
                setDataHora('')
                alert("Consulta marcada.")
                return response.json()
            } else {
                return response.json().then(err => {
                    alert(err.message)
                })
            }
        })
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
            <button type="submit">Enviar</button>
        </form>
    </div>
}

export default Consultas