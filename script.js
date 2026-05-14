
const CARS_DATA = [
    { id: 1, name: "Mercedes AMG GT", price: "3000MAD", engine: "V8 Biturbo", speed: "312 km/h", img: "Capture d'écran 2026-04-27 005545.png" },
    { id: 2, name: "Mercedes G Class", price: "9000MAD", engine: "V8 4.0L", speed: "220 km/h", img: "Capture d'écran 2026-04-27 010115.png" },
    { id: 3, name: "Mercedes SLR McLaren", price: "12000MAD", engine: "5.4L V8", speed: "334 km/h", img: "Capture d'écran 2026-04-27 005713.png" }
];

async function fetchAndDisplayCars() {
    const container = document.getElementById('car-list');
    
    try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        container.innerHTML = "";

        CARS_DATA.forEach(car => {
            const card = document.createElement('div');
            card.className = 'car-card';
            card.innerHTML = `
                <img src="${car.img}" alt="${car.name}">
                <div class="car-info">
                    <h3>${car.name}</h3>
                    <div class="bottom-info">
                        <span class="price">${car.price} / JOUR</span>
                        <button class="btn-view" onclick="openDetails(${car.id})">Details</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
      container.innerHTML = `
            <div style="text-align: center; color: #ff4d4d; padding: 20px; width: 100%;">
                <p>⚠️ Oups! Impossible de charger les voitures.</p>
                <button onclick="location.reload()" style="background: #f1dfb5; border: none; padding: 8px 15px; cursor: pointer; color: black;">Réessayer</button>
            </div>
        `;
        console.error("Erreur de chargement:", error);
    }
}

function openDetails(id) {
    const car = CARS_DATA.find(c => c.id === id);
    document.getElementById('modal-name').innerText = car.name;
    document.getElementById('modal-img').src = car.img;
    document.getElementById('modal-engine').innerText = car.engine;
    document.getElementById('modal-speed').innerText = car.speed;
    
    document.getElementById('car-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('car-modal').classList.add('hidden');
}

const form = document.getElementById('main-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Merci ! Votre message a été envoyé avec succès.");
    form.reset();
});

window.onload = fetchAndDisplayCars;
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('book-now-btn') || e.target.innerText === "Book This Car") {
        
        alert("Félicitations ! Votre réservation pour la " + document.getElementById('modal-name').innerText + " est en cours de traitement.");
        
    
        e.target.innerText = "Reserved ✓";
        e.target.style.background = "#28a745"; 
        e.target.disabled = true;
        
        setTimeout(() => {
            closeModal();
        
            e.target.innerText = "Book This Car";
            e.target.style.background = ""; 
            e.target.disabled = false;
        }, 2000);
    }
});
