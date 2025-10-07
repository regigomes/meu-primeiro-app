// Aguarda o conteúdo da página ser totalmente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA ABAS: PROBLEMA VS SOLUÇÃO ---
    const cycleProblemBtn = document.getElementById('btn-problema');
    const cycleSolutionBtn = document.getElementById('btn-solucao');
    const problemContent = document.getElementById('content-problema');
    const solutionContent = document.getElementById('content-solucao');

    cycleProblemBtn.addEventListener('click', () => {
        problemContent.classList.add('active');
        solutionContent.classList.remove('active');
        cycleProblemBtn.classList.add('active');
        cycleSolutionBtn.classList.remove('active');
    });

    cycleSolutionBtn.addEventListener('click', () => {
        solutionContent.classList.add('active');
        problemContent.classList.remove('active');
        cycleSolutionBtn.classList.add('active');
        cycleProblemBtn.classList.remove('active');
    });

    // --- LÓGICA PARA ABAS: PILARES DO PROJETO ---
    const pillarTabs = document.querySelectorAll('.pillar-tab');
    const pillarContents = document.querySelectorAll('.pillar-content');

    pillarTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Desativa todas as abas
            pillarTabs.forEach(t => {
                t.classList.remove('border-[#A47D5F]');
                t.classList.add('border-transparent', 'text-stone-500');
            });
            // Ativa a aba clicada
            tab.classList.add('border-[#A47D5F]');
            tab.classList.remove('border-transparent', 'text-stone-500');

            const target = tab.getAttribute('data-target');
            // Mostra o conteúdo correspondente
            pillarContents.forEach(content => {
                content.style.display = content.id === target ? 'block' : 'none';
            });
        });
    });

    // --- LÓGICA PARA ANIMAR NÚMEROS AO ROLAR A PÁGINA ---
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetValue = parseInt(element.dataset.target, 10);
                animateValue(element, 0, targetValue, 2000);
                observer.unobserve(element); // Anima apenas uma vez
            }
        });
    }, { threshold: 0.5 }); // Dispara quando 50% do elemento está visível

    document.querySelectorAll('[id^="impact-"]').forEach(el => {
        observer.observe(el);
    });

    // --- LÓGICA PARA CRIAR O GRÁFICO ---
    const beneficiariesCtx = document.getElementById('beneficiariesChart').getContext('2d');
    new Chart(beneficiariesCtx, {
        type: 'bar',
        data: {
            labels: ['Beneficiários Diretos', 'Beneficiários Indiretos'],
            datasets: [{
                label: 'Número de Pessoas',
                data: [80, 2000],
                backgroundColor: ['rgba(164, 125, 95, 0.6)', 'rgba(139, 69, 19, 0.6)'],
                borderColor: ['rgba(164, 125, 95, 1)', 'rgba(139, 69, 19, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: context => ` ${context.parsed.y} pessoas`
                    }
                }
            }
        }
    });

    // --- LÓGICA PARA ROLAGEM SUAVE DA NAVEGAÇÃO ---
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});