
    // Interactive Ambient Glow Toggle
    let isAmbientOn = true;
    function toggleAmbientLight() {
        const glowBg = document.getElementById('ambientLightBg');
        const svgStrip = document.getElementById('svgLedStrip');
        isAmbientOn = !isAmbientOn;

        if (isAmbientOn) {
            glowBg.style.opacity = "1";
            svgStrip.setAttribute('stroke', '#10B981');
        } else {
            glowBg.style.opacity = "0.2";
            svgStrip.setAttribute('stroke', '#06B6D4');
        }
    }

    // Live Clock in Hero Pod
    function updateClock() {
        const now = new Date();
        const timeStr = now.toISOString().substr(11, 8) + ' UTC';
        const clockEl = document.getElementById('podTime');
        if (clockEl) clockEl.textContent = timeStr;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Mobile Menu Toggle Logic
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });

    // Interactive Impact Calculator Logic
    const householdSlider = document.getElementById('householdSlider');
    const produceSlider = document.getElementById('produceSlider');
    const householdVal = document.getElementById('householdVal');
    const produceVal = document.getElementById('produceVal');
    const transportToggle = document.getElementById('transportToggle');

    const calcWater = document.getElementById('calcWater');
    const calcCo2 = document.getElementById('calcCo2');
    const calcMoney = document.getElementById('calcMoney');
    const barWater = document.getElementById('barWater');
    const barCo2 = document.getElementById('barCo2');

    let transportBonus = true;

    transportToggle.addEventListener('click', () => {
        transportBonus = !transportBonus;
        if (transportBonus) {
            transportToggle.classList.remove('bg-gray-300');
            transportToggle.classList.add('bg-emerald-500');
            transportToggle.classList.replace('justify-start', 'justify-end');
        } else {
            transportToggle.classList.remove('bg-emerald-500');
            transportToggle.classList.add('bg-gray-300');
            transportToggle.classList.replace('justify-end', 'justify-start');
        }
        updateCalculator();
    });

    function updateCalculator() {
        const people = parseInt(householdSlider.value);
        const servings = parseInt(produceSlider.value);

        householdVal.textContent = people + (people === 1 ? ' Person' : ' People');
        produceVal.textContent = servings + ' Servings';

        // Calculations
        const waterSavings = Math.round(people * servings * 39); // Liters saved per year
        const co2Multiplier = transportBonus ? 5.2 : 3.4;
        const co2Savings = Math.round(people * servings * co2Multiplier); // kg CO2 saved
        const dollarsSaved = Math.round(people * servings * 13.3);

        calcWater.textContent = waterSavings.toLocaleString() + ' L';
        calcCo2.textContent = co2Savings.toLocaleString() + ' kg';
        calcMoney.textContent = '$' + dollarsSaved.toLocaleString() + ' / year';

        // Visual bar percentage scaling
        const maxWaterRef = 8000;
        const maxCo2Ref = 800;
        barWater.style.width = Math.min(100, Math.max(15, (waterSavings / maxWaterRef) * 100)) + '%';
        barCo2.style.width = Math.min(100, Math.max(15, (co2Savings / maxCo2Ref) * 100)) + '%';
    }

    householdSlider.addEventListener('input', updateCalculator);
    produceSlider.addEventListener('input', updateCalculator);
    updateCalculator();

    // Product Showcase Filter Tabs
    const filterBtns = document.querySelectorAll('.filter-btn');
    const podCards = document.querySelectorAll('.pod-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('bg-emerald-600', 'text-white');
                b.classList.add('text-gray-600');
            });
            btn.classList.add('bg-emerald-600', 'text-white');
            btn.classList.remove('text-gray-600');

            const filter = btn.getAttribute('data-filter');

            podCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Quick View Modal Logic
    function openPodModal(title, price, desc) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalPrice').textContent = price;
        document.getElementById('modalDesc').textContent = desc;
        document.getElementById('podModal').classList.remove('hidden');
    }

    function closePodModal() {
        document.getElementById('podModal').classList.add('hidden');
    }

    // Live Telemetry Dynamic Simulation
    let mistingActive = false;
    function toggleMisting() {
        mistingActive = !mistingActive;
        const btnLabel = document.getElementById('mistStatus');
        btnLabel.textContent = mistingActive ? 'MANUAL ON' : 'AUTO';
        btnLabel.className = mistingActive ? 'text-teal-600 font-bold' : 'text-emerald-700 font-bold';
    }

    function setSpectrum(mode) {
        const bar = document.getElementById('spectrumBar');
        const label = document.getElementById('ledSpectrumLabel');
        if (mode === 'veg') {
            bar.className = "w-full h-3 rounded-full bg-gradient-to-r from-blue-600 via-teal-400 to-emerald-400 relative transition-all duration-500";
            if (label) label.textContent = "Veg Growth";
        } else {
            bar.className = "w-full h-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 relative transition-all duration-500";
            if (label) label.textContent = "Bloom Spectrum";
        }
    }

    // Random live sensor fluctuations simulation
    let syncSeconds = 5;
    setInterval(() => {
        syncSeconds--;
        if (syncSeconds <= 0) {
            syncSeconds = 5;
            // fluctuate temperature
            const tempEl = document.getElementById('statTemp');
            const newTemp = (22.0 + Math.random() * 0.8).toFixed(1);
            if (tempEl) tempEl.textContent = `${newTemp} °C`;

            // fluctuate pH
            const phEl = document.getElementById('statPh');
            const newPh = (6.1 + Math.random() * 0.2).toFixed(1);
            if (phEl) phEl.textContent = `${newPh} pH`;
        }
        const timerEl = document.getElementById('syncTimer');
        if (timerEl) timerEl.textContent = `${syncSeconds}s`;
    }, 1000);

    // Subscription Pricing Toggle (Monthly / Annual)
    let isAnnual = false;
    function toggleBillingCycle() {
        isAnnual = !isAnnual;
        const toggleBtn = document.getElementById('pricingToggleBtn');
        const prices = document.querySelectorAll('.price-value');

        if (isAnnual) {
            toggleBtn.classList.replace('justify-start', 'justify-end');
        } else {
            toggleBtn.classList.replace('justify-end', 'justify-start');
        }

        prices.forEach(price => {
            price.textContent = isAnnual ? price.getAttribute('data-annual') : price.getAttribute('data-monthly');
        });
    }

    // Form Submission Logic
    function handleFormSubmit(e) {
        e.preventDefault();
        document.getElementById('formSuccessToast').classList.remove('hidden');
    }

    function resetForm() {
        document.getElementById('demoForm').reset();
        document.getElementById('formSuccessToast').classList.add('hidden');
    }