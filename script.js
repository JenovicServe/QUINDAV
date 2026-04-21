// Menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Filtres produits
const filterButtons = document.querySelectorAll('.filter-btn');
const productItems = document.querySelectorAll('.product-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            productItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .feature, .product-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Gestion du formulaire de devis
const devisForm = document.getElementById('devisForm');
if (devisForm) {
    devisForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(devisForm);
        
        try {
            // Envoi vers Formspree (gratuit, 50 submissions/mois)
            const response = await fetch(devisForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                devisForm.style.display = 'none';
                document.getElementById('formSuccess').style.display = 'block';
                
                // Option: envoyer aussi sur WhatsApp
                const nom = document.getElementById('nom').value;
                const telephone = document.getElementById('telephone').value;
                const produits = document.getElementById('produits').value;
                const message = `*Nouvelle demande de devis QUINDAV*%0A%0A*Nom:* ${nom}%0A*Téléphone:* ${telephone}%0A*Produits:* ${produits}`;
                
                // Décommenter pour envoyer aussi sur WhatsApp
                // window.open(`https://wa.me/243974663487?text=${message}`, '_blank');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue. Veuillez nous contacter directement sur WhatsApp.');
        }
    });
}