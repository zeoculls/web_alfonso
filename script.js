// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLanguageSwitcher();
    initSlider();
    initMobileMenu();
    initModal();
    initSmoothScrolling();
    initFormValidation();
    initScrollEffects();
    initClinicCarousel();
});

// Hero Slider Functionality
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event listeners for navigation
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto-slide functionality
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Start auto-slide
    startAutoSlide();

    // Pause auto-slide on hover
    const slider = document.querySelector('.hero-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('#main-header');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!header.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// Modal Functionality
function initModal() {
    const modal = document.getElementById('contact-modal');
    const contactButtons = document.querySelectorAll('[href="#contacto"], .footer-button');
    const closeBtn = document.querySelector('.close');

    // Open modal
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('#main-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Validation and Submission
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email) {
                showNotification('Por favor, completa los campos obligatorios.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, introduce un email válido.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Enviando mensaje...', 'info');
            
            // Simulate API call
            setTimeout(() => {
                showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
                contactForm.reset();
                
                // Close modal after success
                setTimeout(() => {
                    const modal = document.getElementById('contact-modal');
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 2000);
            }, 1500);
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Scroll Effects
function initScrollEffects() {
    // Header scroll effect
    const header = document.querySelector('#main-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .team-member, .about-content');
    animateElements.forEach(el => observer.observe(el));
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        padding: 20px;
        gap: 15px;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    #main-header.scrolled {
        background: rgba(255,255,255,0.95);
        backdrop-filter: blur(10px);
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 10px;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;
document.head.appendChild(style);

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Language Switcher Functionality
const translations = {
    es: {
        // Navigation
        'nav-inicio': 'Inicio',
        'nav-diagnostico': 'Diagnóstico',
        'nav-tratamiento': 'Tratamiento',
        'nav-rehabilitacion': 'Rehabilitación',
        'nav-equipo': 'Equipo',
        'nav-contacto': 'Contacto',
        // Hero Slider
        'hero-title-1': 'Maldonado&Herrero. Clínica del Dolor Articular y Osteomuscular',
        'hero-subtitle-1': 'Especialistas en Traumatología, Radiología y Rehabilitación',
        'hero-cta-1': 'Nuestro Diagnóstico',
        'hero-title-2': 'Diagnóstico Preciso',
        'hero-subtitle-2': 'Realización y valoración de pruebas de imagen en la misma consulta',
        'hero-cta-2': 'Ver Tratamientos',
        'hero-title-3': 'Equipo Especializado',
        'hero-subtitle-3': 'Expertos en traumatología, rehabilitación e imagen',
        'hero-cta-3': 'Conoce Nuestro Equipo',
        // Welcome
        'welcome-title': 'BIENVENIDO A CLÍNICA Maldonado&Herrero. Clínica del Dolor Articular y Osteomuscular',
        'welcome-subtitle': 'Especialistas en Traumatología, Radiología y Rehabilitación',
        // Services
        'service-diagnostico': 'Diagnóstico',
        'service-diagnostico-desc': 'Anamnesis + Exploración Física + Pruebas de Imagen en una misma consulta para un diagnóstico preciso y rápido.',
        'service-ecografia': 'Ecografía Musculoesquelética',
        'service-ecografia-desc': 'Ecógrafo de alta gama con informe detallado y explicado por radiólogo especializado en la misma consulta.',
        'service-tratamiento': 'Tratamiento No Quirúrgico',
        'service-tratamiento-desc': 'Ejercicios dirigidos, ondas de choque, infiltraciones dirigidas por ecografía (ecoguiadas) y técnicas percutáneas mínimamente invasivas.',
        'service-rehabilitacion': 'Rehabilitación Especializada',
        'service-rehabilitacion-desc': 'Ejercicios dirigidos por patología para recuperar la funcionalidad y mejorar la calidad de vida.',
        'service-seguimiento': 'Seguimiento',
        'service-seguimiento-desc': 'Tras el tratamiento, realizaremos un seguimiento de la evolución del paciente.',
        'saber-mas': 'Saber más',
        // CTA
        'cta-title': '¿Te gustaría que valorásemos tu caso?',
        'cta-text': 'Puedes contactar con nosotros llamando al',
        'cta-text-2': 'o en el correo',
        'cta-button': 'CONTACTA',
        // About
        'about-title': '¿Por qué elegir Clínica Maldonado&Herrero?',
        'about-point-1': 'Nuestra filosofía se basa en realizar un diagnóstico preciso para poder ofrecer el tratamiento más adecuado, complementado con un seguimiento personalizado.',
        'about-point-2': 'Nuestro objetivo será mejorar su calidad de vida.',
        'about-point-3': 'En la clínica nos dedicamos al diagnóstico y tratamiento integral del dolor articular y la patología musculoesquelética. Nuestro enfoque combina la experiencia clínica con la tecnología más avanzada para ofrecerte una atención precisa, personalizada y efectiva.',
        // Sections
        'section-diagnostico': 'DIAGNÓSTICO',
        'diagnostico-pilar-1-title': 'Consulta con médico especialista',
        'diagnostico-pilar-1-desc': 'Consulta con médico especialista en Traumatología y/o Rehabilitación. Si tiene pruebas de imagen previas serán valoradas por médico radiólogo especialista en musculoesquelético para un diagnóstico más preciso.',
        'diagnostico-pilar-2-title': 'Ecografía de alta gama',
        'diagnostico-pilar-2-desc': 'Ecografía de alta gama realizada por médico especialista en radiología con realización de informe radiológico completo.',
        'diagnostico-feature-1-title': 'Solicitamos solo las pruebas necesarias',
        'diagnostico-feature-1-desc': 'Te indicaremos únicamente las pruebas de imagen que realmente se requieran, y si ya cuentas con estudios previos realizados en otro centro, nuestros especialistas los revisarán e interpretarán durante tu visita.',
        'diagnostico-feature-2-title': 'Ecografía musculoesquelética, en el momento',
        'diagnostico-feature-2-desc': 'Contamos con ecógrafo de referencia y realizamos ecografías musculoesqueléticas con informe detallado, elaborado por un radiólogo especializado en este campo en la misma consulta.',
        'diagnostico-slogan': 'Diagnóstico integral y sin esperas. Consulta tu caso en Clínica Maldonado&Herrero.',
        'section-tratamiento': 'TRATAMIENTO',
        'tratamiento-intro-1': 'Tras una valoración integral y un diagnóstico preciso, recomendaremos el tratamiento más adecuado para cada caso, priorizando siempre las opciones más conservadoras antes de considerar la cirugía.',
        'tratamiento-intro-2': 'Nuestros tratamientos se basan en evidencia científica y se adaptan a las necesidades de cada paciente.',
        'tratamiento-opciones-title': 'Opciones de tratamiento no quirúrgico:',
        'tratamiento-opcion-1': 'Fisioterapia con ejercicios dirigidos',
        'tratamiento-opcion-2': 'Infiltraciones ecoguiadas',
        'tratamiento-opcion-2-desc': '(seguras y precisas gracias al control por imagen)',
        'tratamiento-opcion-2-item-1': 'Cortico-anestésicas',
        'tratamiento-opcion-2-item-2': 'Ácido hialurónico',
        'tratamiento-opcion-2-item-3': 'Plasma Rico en Plaquetas (PRP)',
        'tratamiento-opcion-3': 'Técnicas percutáneas ecoguiadas',
        'tratamiento-opcion-3-desc': 'Mínimamente invasivas',
        'tratamiento-opcion-4': 'Ondas de choque focales',
        'tratamiento-opcion-5': 'Bloqueos de nervios periféricos',
        'tratamiento-opcion-5-desc': 'Guiado por ecografía',
        'section-patologias': '¿Qué patologías tratamos con mayor frecuencia?',
        'patologias-subtitle': 'En Clínica Maldonado&Herrero abordamos un amplio abanico de afecciones musculoesqueléticas. Estas son algunas de las más comunes:',
        'patologia-hombro-title': 'Patología de hombro',
        'patologia-hombro-1': 'Tendinopatía calcificante',
        'patologia-hombro-2': 'Artrosis glenohumeral',
        'patologia-hombro-3': 'Tendinopatía del manguito rotador',
        'patologia-hombro-4': 'Bursitis subacromiosubdeltoidea',
        'patologia-hombro-5': 'Patología acromioclavicular',
        'patologia-codo-title': 'Patología de codo',
        'patologia-codo-1': 'Epicondilitis (codo de tenista)',
        'patologia-codo-2': 'Epitrocleitis (codo de golfista)',
        'patologia-muneca-title': 'Patología de muñeca y mano',
        'patologia-muneca-1': 'Tenosinovitis estenosante de Quervain',
        'patologia-muneca-2': 'Dedos en resorte',
        'patologia-cadera-title': 'Patología de cadera',
        'patologia-cadera-1': 'Artrosis de cadera',
        'patologia-cadera-2': 'Lesiones del labrum',
        'patologia-cadera-3': 'Síndrome subglúteo',
        'patologia-cadera-4': 'Síndrome trocantéreo',
        'patologia-rodilla-title': 'Patología de rodilla',
        'patologia-rodilla-1': 'Artrosis de rodilla',
        'patologia-rodilla-2': 'Condropatía rotuliana',
        'patologia-rodilla-3': 'Tendinitis de la pata de ganso',
        'patologia-rodilla-4': 'Síndrome de la cintilla iliotibial',
        'patologia-rodilla-5': 'Quiste de Baker',
        'patologia-tobillo-title': 'Patología de tobillo y pie',
        'patologia-tobillo-1': 'Artrosis de tobillo',
        'patologia-tobillo-2': 'Fascitis plantar',
        'patologia-tobillo-3': 'Neuroma de Morton',
        'patologia-deportiva-title': 'Patología deportiva',
        'patologia-deportiva-desc': 'Atención especializada en lesiones por sobreuso, traumatismos, tendinopatías o sobrecargas frecuentes en deportistas.',
        'section-rehabilitacion': 'REHABILITACIÓN',
        'rehabilitacion-desc': 'Se diseñará un programa de ejercicios y recomendaciones específicas para cada patología, basado en un diagnóstico preciso y en el adecuado control del dolor del paciente con el objetivo de recuperar la funcionalidad y mejorar la calidad de vida.',
        'section-equipo': 'Nuestro Equipo',
        'doctor-alfonso-1': 'Licenciado en Medicina por Universidad Autónoma de Madrid.',
        'doctor-alfonso-2': 'Especialista vía MIR en Traumatología-Cirugía Ortopédica (HU La Princesa, Madrid).',
        'doctor-alfonso-3': 'Especialista vía MIR en Radiodiagnóstico (HU Doctor Peset, Valencia) con rotaciones específicas en patología musculoesquelética en centros de referencia nacional en Madrid, Bilbao y Valencia.',
        'doctor-alfonso-4': 'Subespecializado en patología musculoesquelética (ecografía, RM, TC, artroRM y tratamientos percutáneos ecoguiados).',
        'doctora-luz-1': 'Grado en Medicina por Universidad de Las Palmas de Gran Canaria.',
        'doctora-luz-2': 'Especialista vía MIR en Medicina Física y Rehabilitación (HU La Fe, Valencia).',
        'doctora-luz-3': 'Doctorada con Sobresaliente Cum Laude (Universidad de Valencia): "Artrosis precoz de rodilla. Revisión clínica de los criterios diagnósticos".',
        'doctora-luz-4': 'Máster y cursos específicos de ecografía musculoesquelética, intervencionismo ecoguiado y ondas de choque.',
        // Footer
        'footer-nosotros': 'NOSOTROS',
        'footer-donde': 'DÓNDE ENCONTRARNOS',
        'footer-horario': 'HORARIO',
        'footer-cita': 'CITA PREVIA',
        'footer-cita-text': 'Antes de acudir al centro es necesario pedir cita previa por teléfono o email.',
        'footer-pedir-cita': 'Pedir Cita',
        // Gallery
        'gallery-title': 'Nuestra Clínica',
        'gallery-description': 'Maldonado&Herrero Clínica del dolor articular y osteomuscular está situada en pleno centro de Madrid (Calle O\'Donnell 25)'
    },
    en: {
        // Navigation
        'nav-inicio': 'Home',
        'nav-diagnostico': 'Diagnosis',
        'nav-tratamiento': 'Treatment',
        'nav-rehabilitacion': 'Rehabilitation',
        'nav-equipo': 'Team',
        'nav-contacto': 'Contact',
        // Hero Slider
        'hero-title-1': 'Maldonado&Herrero. Joint and Musculoskeletal Pain Clinic',
        'hero-subtitle-1': 'Specialists in Traumatology, Radiology and Rehabilitation',
        'hero-cta-1': 'Our Diagnosis',
        'hero-title-2': 'Precise Diagnosis',
        'hero-subtitle-2': 'Performance and evaluation of imaging tests in the same consultation',
        'hero-cta-2': 'View Treatments',
        'hero-title-3': 'Specialized Team',
        'hero-subtitle-3': 'Experts in traumatology, rehabilitation and imaging',
        'hero-cta-3': 'Meet Our Team',
        // Welcome
        'welcome-title': 'WELCOME TO Maldonado&Herrero CLINIC. Joint and Musculoskeletal Pain Clinic',
        'welcome-subtitle': 'Specialists in Traumatology, Radiology and Rehabilitation',
        // Services
        'service-diagnostico': 'Diagnosis',
        'service-diagnostico-desc': 'Medical History + Physical Examination + Imaging Tests in the same consultation for a precise and rapid diagnosis.',
        'service-ecografia': 'Musculoskeletal Ultrasound',
        'service-ecografia-desc': 'High-end ultrasound equipment with detailed report explained by a specialized radiologist in the same consultation.',
        'service-tratamiento': 'Non-Surgical Treatment',
        'service-tratamiento-desc': 'Directed exercises, shock waves, ultrasound-guided infiltrations (ecoguiadas) and minimally invasive percutaneous techniques.',
        'service-rehabilitacion': 'Specialized Rehabilitation',
        'service-rehabilitacion-desc': 'Pathology-directed exercises to recover functionality and improve quality of life.',
        'service-seguimiento': 'Follow-up',
        'service-seguimiento-desc': 'After treatment, we will monitor the patient\'s progress.',
        'saber-mas': 'Learn more',
        // CTA
        'cta-title': 'Would you like us to evaluate your case?',
        'cta-text': 'You can contact us by calling',
        'cta-text-2': 'or by email',
        'cta-button': 'CONTACT',
        // About
        'about-title': 'Why choose Maldonado&Herrero Clinic?',
        'about-point-1': 'Our philosophy is based on making an accurate diagnosis to offer the most appropriate treatment, complemented with personalized follow-up.',
        'about-point-2': 'Our goal will be to improve your quality of life.',
        'about-point-3': 'At the clinic we are dedicated to the diagnosis and comprehensive treatment of joint pain and musculoskeletal pathology. Our approach combines clinical experience with the most advanced technology to provide you with precise, personalized and effective care.',
        // Sections
        'section-diagnostico': 'DIAGNOSIS',
        'diagnostico-pilar-1-title': 'Consultation with specialist doctor',
        'diagnostico-pilar-1-desc': 'Consultation with a specialist doctor in Traumatology and/or Rehabilitation. If you have previous imaging tests, they will be evaluated by a radiologist specialist in musculoskeletal medicine for a more precise diagnosis.',
        'diagnostico-pilar-2-title': 'High-end ultrasound',
        'diagnostico-pilar-2-desc': 'High-end ultrasound performed by a specialist doctor in radiology with complete radiological report.',
        'diagnostico-feature-1-title': 'We only request necessary tests',
        'diagnostico-feature-1-desc': 'We will indicate only the imaging tests that are really required, and if you already have previous studies performed at another center, our specialists will review and interpret them during your visit.',
        'diagnostico-feature-2-title': 'Musculoskeletal ultrasound, on the spot',
        'diagnostico-feature-2-desc': 'We have a reference ultrasound machine and perform musculoskeletal ultrasounds with detailed report, prepared by a radiologist specialized in this field in the same consultation.',
        'diagnostico-slogan': 'Comprehensive diagnosis without waiting. Consult your case at Maldonado&Herrero Clinic.',
        'section-tratamiento': 'TREATMENT',
        'tratamiento-intro-1': 'After a comprehensive assessment and accurate diagnosis, we will recommend the most appropriate treatment for each case, always prioritizing the most conservative options before considering surgery.',
        'tratamiento-intro-2': 'Our treatments are based on scientific evidence and are adapted to the needs of each patient.',
        'tratamiento-opciones-title': 'Non-surgical treatment options:',
        'tratamiento-opcion-1': 'Physiotherapy with directed exercises',
        'tratamiento-opcion-2': 'Ultrasound-guided infiltrations',
        'tratamiento-opcion-2-desc': '(safe and precise thanks to image control)',
        'tratamiento-opcion-2-item-1': 'Corticosteroid-anesthetic',
        'tratamiento-opcion-2-item-2': 'Hyaluronic acid',
        'tratamiento-opcion-2-item-3': 'Platelet Rich Plasma (PRP)',
        'tratamiento-opcion-3': 'Ultrasound-guided percutaneous techniques',
        'tratamiento-opcion-3-desc': 'Minimally invasive',
        'tratamiento-opcion-4': 'Focal shock waves',
        'tratamiento-opcion-5': 'Peripheral nerve blocks',
        'tratamiento-opcion-5-desc': 'Ultrasound-guided',
        'section-patologias': 'What pathologies do we treat most frequently?',
        'patologias-subtitle': 'At Maldonado&Herrero Clinic we address a wide range of musculoskeletal conditions. Here are some of the most common:',
        'patologia-hombro-title': 'Shoulder pathology',
        'patologia-hombro-1': 'Calcific tendinopathy',
        'patologia-hombro-2': 'Glenohumeral osteoarthritis',
        'patologia-hombro-3': 'Rotator cuff tendinopathy',
        'patologia-hombro-4': 'Subacromial-subdeltoid bursitis',
        'patologia-hombro-5': 'Acromioclavicular pathology',
        'patologia-codo-title': 'Elbow pathology',
        'patologia-codo-1': 'Epicondylitis (tennis elbow)',
        'patologia-codo-2': 'Medial epicondylitis (golfer\'s elbow)',
        'patologia-muneca-title': 'Wrist and hand pathology',
        'patologia-muneca-1': 'De Quervain\'s stenosing tenosynovitis',
        'patologia-muneca-2': 'Trigger finger',
        'patologia-cadera-title': 'Hip pathology',
        'patologia-cadera-1': 'Hip osteoarthritis',
        'patologia-cadera-2': 'Labrum injuries',
        'patologia-cadera-3': 'Subgluteal syndrome',
        'patologia-cadera-4': 'Trochanteric syndrome',
        'patologia-rodilla-title': 'Knee pathology',
        'patologia-rodilla-1': 'Knee osteoarthritis',
        'patologia-rodilla-2': 'Patellar chondropathy',
        'patologia-rodilla-3': 'Pes anserinus tendinitis',
        'patologia-rodilla-4': 'Iliotibial band syndrome',
        'patologia-rodilla-5': 'Baker\'s cyst',
        'patologia-tobillo-title': 'Ankle and foot pathology',
        'patologia-tobillo-1': 'Ankle osteoarthritis',
        'patologia-tobillo-2': 'Plantar fasciitis',
        'patologia-tobillo-3': 'Morton\'s neuroma',
        'patologia-deportiva-title': 'Sports pathology',
        'patologia-deportiva-desc': 'Specialized care for overuse injuries, trauma, tendinopathies or frequent overloads in athletes.',
        'section-rehabilitacion': 'REHABILITATION',
        'rehabilitacion-desc': 'An exercise program and specific recommendations will be designed for each pathology, based on an accurate diagnosis and adequate pain control for the patient, with the aim of recovering functionality and improving quality of life.',
        'section-equipo': 'Our Team',
        'doctor-alfonso-1': 'Medical Degree from Autonomous University of Madrid.',
        'doctor-alfonso-2': 'Specialist via MIR in Traumatology-Orthopedic Surgery (HU La Princesa, Madrid).',
        'doctor-alfonso-3': 'Specialist via MIR in Radiodiagnosis (HU Doctor Peset, Valencia) with specific rotations in musculoskeletal pathology at national reference centers in Madrid, Bilbao and Valencia.',
        'doctor-alfonso-4': 'Subspecialized in musculoskeletal pathology (ultrasound, MRI, CT, arthroMRI and ultrasound-guided percutaneous treatments).',
        'doctora-luz-1': 'Medical Degree from University of Las Palmas de Gran Canaria.',
        'doctora-luz-2': 'Specialist via MIR in Physical Medicine and Rehabilitation (HU La Fe, Valencia).',
        'doctora-luz-3': 'PhD with Outstanding Cum Laude (University of Valencia): "Early knee osteoarthritis. Clinical review of diagnostic criteria".',
        'doctora-luz-4': 'Master\'s degree and specific courses in musculoskeletal ultrasound, ultrasound-guided interventionism and shock waves.',
        // Footer
        'footer-nosotros': 'ABOUT US',
        'footer-donde': 'WHERE TO FIND US',
        'footer-horario': 'SCHEDULE',
        'footer-cita': 'APPOINTMENT',
        'footer-cita-text': 'Before visiting the center, it is necessary to make an appointment by phone or email.',
        'footer-pedir-cita': 'Request Appointment',
        // Gallery
        'gallery-title': 'Our Clinic',
        'gallery-description': 'Maldonado&Herrero Joint and Musculoskeletal Pain Clinic is located in the heart of Madrid (O\'Donnell Street 25)'
    }
};

function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = localStorage.getItem('language') || 'es';
    
    // Set initial language
    changeLanguage(currentLang);
    
    // Add event listeners
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            changeLanguage(lang);
            localStorage.setItem('language', lang);
        });
    });
}

function changeLanguage(lang) {
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang === 'es' ? 'es-ES' : 'en-GB');
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update title and meta description
    if (lang === 'en') {
        document.title = 'Maldonado&Herrero Clinic - Specialists in Traumatology, Radiology and Rehabilitation';
        document.querySelector('meta[name="description"]').setAttribute('content', 'Welcome to Maldonado&Herrero Clinic, specialists in diagnosis and comprehensive treatment of joint pain and musculoskeletal pathologies in Madrid. Advanced technology and personalized care.');
    } else {
        document.title = 'Clínica Maldonado&Herrero - Especialistas en Traumatología, Radiología y Rehabilitación';
        document.querySelector('meta[name="description"]').setAttribute('content', 'Bienvenido a Clínica Maldonado&Herrero, especialistas en diagnóstico y tratamiento integral del dolor articular y patologías musculoesqueléticas en Madrid. Tecnología avanzada y atención personalizada.');
    }
}

// Clinic Carousel Functionality
function initClinicCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    let carouselInterval;

    if (slides.length === 0) return;

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    // Initialize carousel
    showSlide(0);

    // Auto-advance carousel every 2 seconds
    function startCarousel() {
        carouselInterval = setInterval(nextSlide, 2000);
    }

    function stopCarousel() {
        clearInterval(carouselInterval);
    }

    // Start auto-advance
    startCarousel();

    // Pause on hover
    const carouselContainer = document.querySelector('.clinic-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopCarousel);
        carouselContainer.addEventListener('mouseleave', startCarousel);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopCarousel();
            showSlide(index);
            startCarousel();
        });
    });
}
