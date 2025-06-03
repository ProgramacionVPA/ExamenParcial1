document.addEventListener('DOMContentLoaded', () => {
    // Referencia al botón para cambiar el tema
    const themeToggleButton = document.getElementById('theme-toggle');
    // Referencia al formulario de inscripción
    const form = document.getElementById('registration-form');
    // Referencia a la sección donde se mostrarán los participantes aleatorios
    const participantsSection = document.getElementById('participantes');

    // Evento para cambiar entre tema claro y oscuro
    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });

    // Validación del formulario para que ningún campo esté vacío
    form.addEventListener('submit', function(e) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const career = document.getElementById('career').value.trim();

        // Si algún campo está vacío, muestra una alerta y evita el envío
        if (!name || !email || !career) {
            alert('Por favor, completa todos los campos.');
            e.preventDefault();
        }
    });

    // Llama a la API para obtener 5 participantes aleatorios
    fetch('https://randomuser.me/api/?results=5')
        .then(response => response.json()) // Convierte la respuesta a JSON
        .then(data => {
            const participants = data.results;
            // Por cada participante, crea un div con su imagen y nombre
            participants.forEach(participant => {
                const participantDiv = document.createElement('div');
                participantDiv.classList.add('participant');
                participantDiv.innerHTML = `
                    <img src="${participant.picture.medium}" alt="${participant.name.first} ${participant.name.last}">
                    <p>${participant.name.first} ${participant.name.last}</p>
                `;
                // Inserta el participante dentro de la sección con id="participantes"
                participantsSection.appendChild(participantDiv);
            });
        })
        .catch(error => console.error('Error al obtener los participantes:', error)); // Manejo de errores
});