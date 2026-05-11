// 1. قاعدة البيانات (يمكنك محاكاتها كأنها من API)
const CARS_DATA = [
    { id: 1, name: "Mercedes AMG GT", price: "3000MAD", engine: "V8 Biturbo", speed: "312 km/h", img: "Capture d'écran 2026-04-27 005545.png" },
    { id: 2, name: "Mercedes G Class", price: "9000MAD", engine: "V8 4.0L", speed: "220 km/h", img: "Capture d'écran 2026-04-27 010115.png" },
    { id: 3, name: "Mercedes SLR McLaren", price: "12000MAD", engine: "5.4L V8", speed: "334 km/h", img: "Capture d'écran 2026-04-27 005713.png" }
];

// 2. وظيفة جلب البيانات باستعمال Async/Await (الطلب الأساسي للأستاذ)
async function fetchAndDisplayCars() {
    const container = document.getElementById('car-list');
    
    try {
        // محاكاة انتظار السيرفر
        await new Promise(resolve => setTimeout(resolve, 800));
        
        container.innerHTML = ""; // مسح جملة "Chargement..."

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
        console.error("Erreur de chargement:", error);
    }
}

// 3. فتح نافذة التفاصيل (Frame 2 Logic)
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

// 4. Form Validation (كما طلبت)
const form = document.getElementById('main-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Merci ! Votre message a été envoyé avec succès.");
    form.reset();
});

// تشغيل جلب البيانات عند فتح الصفحة
window.onload = fetchAndDisplayCars;
// هاد الوظيفة كاتسنا الصفحة تتحمل كاملة
document.addEventListener('click', function(e) {
    // كنشوفو واش اللي كليكينا عليه هو الزر ديال "Book This Car"
    if (e.target && e.target.classList.contains('book-now-btn') || e.target.innerText === "Book This Car") {
        
        // 1. إظهار رسالة نجاح
        alert("Félicitations ! Votre réservation pour la " + document.getElementById('modal-name').innerText + " est en cours de traitement.");
        
        // 2. تغيير شكل الزر باش يبان بلي راه تضغط
        e.target.innerText = "Reserved ✓";
        e.target.style.background = "#28a745"; // كيرجع أخضر
        e.target.disabled = true; // كيتوكف باش ميتعاودش الكليك
        
        // 3. نسدو النافذة (Modal) مورا 2 ثواني بشكل تلقائي
        setTimeout(() => {
            closeModal();
            // نرجعو الزر لأصله لمرة جاية
            e.target.innerText = "Book This Car";
            e.target.style.background = ""; 
            e.target.disabled = false;
        }, 2000);
    }
});
