// EmailJS Configuration
// IMPORTANTE: Reemplaza estos valores con tus credenciales de EmailJS
// Puedes obtenerlas en https://www.emailjs.com/
const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_9oorokf',      // Reemplaza con tu Service ID
    TEMPLATE_ID_CLINICA: 'template_ij6i2up',   // Template para email a la clínica
    TEMPLATE_ID_PACIENTE: 'template_wh36zrg',   // Template para email de confirmación al paciente
    PUBLIC_KEY: 'AzQCfc2LEFIOZ37ja',       // Reemplaza con tu Public Key
    TO_EMAIL: 'dr.alfonsomaldonado@gmail.com'  // Email de destino (clínica)
//    TO_EMAIL: 'dr.alfonsomaldonado@gmail.com'  // Email de destino

};

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
})();

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
            
            // Get current language
            let currentLang = localStorage.getItem('language') || 'es';
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email) {
                showNotification(translations[currentLang]['notification-required-fields'], 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification(translations[currentLang]['notification-invalid-email'], 'error');
                return;
            }
            
            // Get service name from select
            const serviceSelect = document.getElementById('service');
            const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
            
            // Show loading notification
            showNotification(translations[currentLang]['notification-sending'], 'info');
            
            // Email texts for different languages
            const emailTexts = {
                es: {
                    noPhone: 'No proporcionado',
                    noService: 'No especificado',
                    noMessage: 'Sin mensaje adicional'
                },
                en: {
                    noPhone: 'Not provided',
                    noService: 'Not specified',
                    noMessage: 'No additional message'
                }
            };
            
            // Prepare email template parameters for clinic
            const templateParamsClinica = {
                from_name: name,
                from_email: email,
                phone: phone || emailTexts[currentLang].noPhone,
                service: serviceText || emailTexts[currentLang].noService,
                message: message || emailTexts[currentLang].noMessage,
                to_email: EMAILJS_CONFIG.TO_EMAIL, // Email de destino (usar {{to_email}} en el template)
                reply_to: email // Para que puedas responder directamente al usuario
            };
            
            // Prepare email template parameters for patient (confirmation)
            const templateParamsPaciente = {
                to_name: name,
                to_email: email,
                service: serviceText || emailTexts[currentLang].noService,
                clinic_email: EMAILJS_CONFIG.TO_EMAIL
            };
            
            // Send both emails using EmailJS
            Promise.all([
                // Email to clinic
                emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID_CLINICA,
                    templateParamsClinica
                ),
                // Email to patient (confirmation) - only if template is configured
                EMAILJS_CONFIG.TEMPLATE_ID_PACIENTE !== 'YOUR_PATIENT_TEMPLATE_ID' 
                    ? emailjs.send(
                        EMAILJS_CONFIG.SERVICE_ID,
                        EMAILJS_CONFIG.TEMPLATE_ID_PACIENTE,
                        templateParamsPaciente
                    )
                    : Promise.resolve({ status: 200, text: 'Patient email template not configured' })
            ])
            .then(function(responses) {
                console.log('Emails enviados exitosamente!', responses);
                showNotification(translations[currentLang]['notification-success'], 'success');
                contactForm.reset();
                
                // Close modal after success
                setTimeout(() => {
                    const modal = document.getElementById('contact-modal');
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 2000);
            }, function(error) {
                console.error('Error al enviar el email:', error);
                let errorMessage = translations[currentLang]['notification-error'];
                
                if (error.status === 405 || error.text === 'Method Not Allowed') {
                    errorMessage += translations[currentLang]['notification-error-template'];
                } else if (error.status === 400) {
                    errorMessage += translations[currentLang]['notification-error-fields'];
                } else {
                    errorMessage += translations[currentLang]['notification-error-retry'];
                }
                
                showNotification(errorMessage, 'error');
            });
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
        'nav-clinica': 'Clínica',
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
        'what-we-do-title': '¿Qué realizamos?',
        'what-we-do-1': 'Diagnóstico de alta precisión.',
        'what-we-do-2': 'Ecografía: ecógrafo de alta gama con médico especialista en radiología.',
        'what-we-do-3': 'Tratamientos dirigidos no quirúrgicos: infiltraciones ecoguiadas, técnicas percutáneas mínimamente invasivas, ondas de choque, bloqueos de Nervio Periférico.',
        'what-we-do-4': 'Rehabilitación: médico especialista en rehabilitación.',
        // Welcome
        'welcome-title': 'Bienvenido a Clínica Maldonado&Herrero. Clínica del Dolor Articular y Osteomuscular',
        'welcome-subtitle': 'Especialistas en Traumatología, Radiología y Rehabilitación',
        // Services
        'service-diagnostico': 'Diagnóstico',
        'service-diagnostico-desc': 'Anamnesis + Exploración Física + Pruebas de Imagen en una misma consulta para un diagnóstico preciso y rápido.',
        'service-ecografia': 'Ecografía Musculoesquelética y de Nervio Periférico',
        'service-ecografia-desc': 'Ecografía realizada por médico especialista en radiología y subespecializado en este campo, con realización de informe radiológico completo en la misma consulta.',
        'service-tratamiento': 'Tratamiento No Quirúrgico',
        'service-tratamiento-desc': 'Ejercicios terapéuticos dirigidos, infiltraciones guiadas por ecografía, técnicas percutáneas mínimamente invasivas, ondas de choque focales y bloqueos de nervio periférico.',
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
        'diagnostico-pilar-1-desc': 'Consulta con médico especialista en Traumatología y/o Rehabilitación. Si ya cuenta con estudios previos realizados en otro centro, nuestros especialistas los revisarán e interpretarán durante su visita.',
        'diagnostico-pilar-2-title': 'Ecógrafo de alta gama',
        'diagnostico-pilar-2-desc': 'Ecógrafo de alta gama realizado por médico especialista en radiología con realización de informe radiológico completo.',
        'ecografias-frecuentes-title': 'Ecografías más frecuentes realizadas:',
        'ecografias-1': 'Ecografía articular (hombro, codo, muñeca, dedos, cadera, rodilla, tobillo, pie).',
        'ecografias-2': 'Ecografía muscular.',
        'ecografias-3': 'Ecografía de nervio periférico.',
        'ecografias-4': 'Ecografía de partes blandas por un bulto.',
        'diagnostico-slogan': 'Diagnóstico integral y sin esperas. Consulta tu caso en Clínica Maldonado&Herrero.',
        'section-tratamiento': 'TRATAMIENTO',
        'tratamiento-intro-1': 'Tras una valoración integral y un diagnóstico preciso, recomendaremos y explicaremos el tratamiento más adecuado para cada caso, priorizando siempre las opciones más conservadoras.',
        'tratamiento-intro-2': '¿Qué tratamientos realizamos en la clínica?',
        'tratamiento-opciones-title': 'Opciones de tratamiento no quirúrgico:',
        'tratamiento-opcion-1': 'Ejercicios terapéuticos dirigidos',
        'tratamiento-opcion-2': 'Infiltraciones ecoguiadas',
        'tratamiento-opcion-2-desc': '(seguras y precisas gracias al control por imagen)',
        'tratamiento-opcion-2-item-1': 'Cortico-anestésicas',
        'tratamiento-opcion-2-item-2': 'Ácido hialurónico',
        'tratamiento-opcion-2-item-3': 'Plasma Rico en Plaquetas (PRP)',
        'tratamiento-opcion-2-item-4': 'Toxina botulínica',
        'tratamiento-opcion-3': 'Técnicas percutáneas ecoguiadas',
        'tratamiento-opcion-3-desc': 'Mínimamente invasivas',
        'tratamiento-opcion-4': 'Ondas de choque focales',
        'tratamiento-opcion-5': 'Bloqueos de nervios periféricos',
        'tratamiento-opcion-5-desc': 'Guiado por ecografía',
        'tratamiento-opcion-6': 'Otros tratamientos',
        'tratamiento-opcion-6-item-1': 'Dolor en articulación temporomandibular.',
        'tratamiento-opcion-6-item-2': 'Gangliones.',
        'tratamiento-opcion-6-item-3': 'Drenaje de lesión Morel-Lavallée.',
        'tratamiento-opcion-6-item-4': 'Patología de nervio periférico.',
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
        'doctor-alfonso-4': 'Subespecializado en patología musculoesquelética (ecografía, RM, TC, ArtroRM/TC y tratamientos percutáneos ecoguiados).',
        'doctora-luz-1': 'Grado en Medicina por Universidad de Las Palmas de Gran Canaria.',
        'doctora-luz-2': 'Especialista vía MIR en Medicina Física y Rehabilitación (HU La Fe, Valencia).',
        'doctora-luz-3': 'Doctorada con Sobresaliente Cum Laude (Universidad de Valencia): "Artrosis precoz de rodilla. Revisión clínica de los criterios diagnósticos".',
        'doctora-luz-4': 'Máster y cursos específicos de ecografía musculoesquelética, intervencionismo ecoguiado y ondas de choque.',
        // Footer
        'footer-nosotros': 'NOSOTROS',
        'footer-especialistas': 'Especialistas en Traumatología, Radiología y Rehabilitación.',
        'footer-donde': 'DÓNDE ENCONTRARNOS',
        'footer-horario': 'HORARIO',
        'footer-horario-text': 'Lunes - Viernes: 16:00 - 20:00',
        'footer-horario-sabado': 'Sábados: 9:00 - 14:00',
        'footer-horario-domingo': 'Domingos: Cerrado',
        'footer-cita': 'CITA PREVIA',
        'footer-cita-text': 'Antes de acudir al centro es necesario pedir cita previa por teléfono o email.',
        'footer-pedir-cita': 'Pedir Cita',
        // Gallery
        'gallery-title': 'Nuestra Clínica',
        'gallery-description': 'Maldonado&Herrero Clínica del dolor articular y osteomuscular está situada en pleno centro de Madrid (Calle O\'Donnell 25)',
        // Contact Form Services
        'contact-service-1': 'Consulta médico especialista (con opción a ecografía)',
        'contact-service-2': 'Ecografía',
        'contact-service-3': 'Tratamiento infiltración ecoguiada o técnica percutánea ecoguiada',
        'contact-service-4': 'Bloqueo de nervio periférico',
        'contact-service-5': 'Tratamiento con ondas de choque focales',
        'contact-service-6': 'Otros',
        'contact-description': 'Explíquenos el motivo y si tiene pruebas de imagen ya realizadas y cuáles (Radiografía, Ecografía, TAC, Resonancia...)',
        // Contact Modal
        'contact-modal-title': 'Contacto',
        'contact-label-name': 'Nombre completo',
        'contact-label-email': 'Email',
        'contact-label-phone': 'Teléfono',
        'contact-label-service': 'Servicio de interés',
        'contact-select-service': 'Selecciona un servicio',
        'contact-label-message': 'Mensaje',
        'contact-submit-button': 'Enviar Mensaje',
        // Footer Links
        'footer-privacy': 'Política de Privacidad',
        'footer-cookies': 'Política de Cookies',
        'footer-legal': 'Aviso Legal',
        // Notification Messages
        'notification-required-fields': 'Por favor, completa los campos obligatorios.',
        'notification-invalid-email': 'Por favor, introduce un email válido.',
        'notification-sending': 'Enviando mensaje...',
        'notification-success': '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.',
        'notification-error': 'Error al enviar el mensaje. ',
        'notification-error-template': 'Por favor, verifica que los Template IDs estén configurados correctamente en EmailJS.',
        'notification-error-fields': 'Verifica que todos los campos del formulario estén completos.',
        'notification-error-retry': 'Por favor, inténtalo de nuevo o contacta directamente por teléfono.'
    },
    en: {
        // Navigation
        'nav-inicio': 'Home',
        'nav-diagnostico': 'Diagnosis',
        'nav-tratamiento': 'Treatment',
        'nav-rehabilitacion': 'Rehabilitation',
        'nav-clinica': 'Clinic',
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
        'what-we-do-title': 'What do we do?',
        'what-we-do-1': 'High-precision diagnosis.',
        'what-we-do-2': 'Ultrasound: high-end ultrasound equipment with specialist doctor in radiology.',
        'what-we-do-3': 'Non-surgical targeted treatments: ultrasound-guided infiltrations, minimally invasive percutaneous techniques, shock waves, peripheral nerve blocks.',
        'what-we-do-4': 'Rehabilitation: specialist doctor in rehabilitation.',
        // Welcome
        'welcome-title': 'Welcome to Maldonado&Herrero Clinic. Joint and Musculoskeletal Pain Clinic',
        'welcome-subtitle': 'Specialists in Traumatology, Radiology and Rehabilitation',
        // Services
        'service-diagnostico': 'Diagnosis',
        'service-diagnostico-desc': 'Medical History + Physical Examination + Imaging Tests in the same consultation for a precise and rapid diagnosis.',
        'service-ecografia': 'Musculoskeletal and Peripheral Nerve Ultrasound',
        'service-ecografia-desc': 'Ultrasound performed by a specialist doctor in radiology, subspecialized in this field, with complete radiological report in the same consultation.',
        'service-tratamiento': 'Non-Surgical Treatment',
        'service-tratamiento-desc': 'Directed therapeutic exercises, ultrasound-guided infiltrations, minimally invasive percutaneous techniques, focal shock waves and peripheral nerve blocks.',
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
        'diagnostico-pilar-1-desc': 'Consultation with a specialist doctor in Traumatology and/or Rehabilitation. If you already have previous studies performed at another center, our specialists will review and interpret them during your visit.',
        'diagnostico-pilar-2-title': 'High-end ultrasound scanner',
        'diagnostico-pilar-2-desc': 'Ultrasound performed by a specialist doctor in radiology, subspecialized in this field, with complete radiological report in the same consultation.',
        'ecografias-frecuentes-title': 'Most frequently performed ultrasounds:',
        'ecografias-1': 'Joint ultrasound (shoulder, elbow, wrist, fingers, hip, knee, ankle, foot).',
        'ecografias-2': 'Muscle ultrasound.',
        'ecografias-3': 'Peripheral nerve ultrasound.',
        'ecografias-4': 'Soft tissue ultrasound for a lump.',
        'diagnostico-slogan': 'Comprehensive diagnosis without waiting. Consult your case at Maldonado&Herrero Clinic.',
        'section-tratamiento': 'TREATMENT',
        'tratamiento-intro-1': 'After a comprehensive assessment and accurate diagnosis, we will recommend and explain the most appropriate treatment for each case, always prioritizing the most conservative options.',
        'tratamiento-intro-2': 'What treatments do we perform at the clinic?',
        'tratamiento-opciones-title': 'Non-surgical treatment options:',
        'tratamiento-opcion-1': 'Directed therapeutic exercises',
        'tratamiento-opcion-2': 'Ultrasound-guided infiltrations',
        'tratamiento-opcion-2-desc': '(safe and precise thanks to image control)',
        'tratamiento-opcion-2-item-1': 'Corticosteroid-anesthetic',
        'tratamiento-opcion-2-item-2': 'Hyaluronic acid',
        'tratamiento-opcion-2-item-3': 'Platelet Rich Plasma (PRP)',
        'tratamiento-opcion-2-item-4': 'Botulinum toxin',
        'tratamiento-opcion-3': 'Ultrasound-guided percutaneous techniques',
        'tratamiento-opcion-3-desc': 'Minimally invasive',
        'tratamiento-opcion-4': 'Focal shock waves',
        'tratamiento-opcion-5': 'Peripheral nerve blocks',
        'tratamiento-opcion-5-desc': 'Ultrasound-guided',
        'tratamiento-opcion-6': 'Other treatments',
        'tratamiento-opcion-6-item-1': 'Temporomandibular joint pain.',
        'tratamiento-opcion-6-item-2': 'Ganglia.',
        'tratamiento-opcion-6-item-3': 'Morel-Lavallée lesion drainage.',
        'tratamiento-opcion-6-item-4': 'Peripheral nerve pathology.',
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
        'doctor-alfonso-4': 'Subspecialized in musculoskeletal pathology (ultrasound, MRI, CT, ArthroMRI/CT and ultrasound-guided percutaneous treatments).',
        'doctora-luz-1': 'Medical Degree from University of Las Palmas de Gran Canaria.',
        'doctora-luz-2': 'Specialist via MIR in Physical Medicine and Rehabilitation (HU La Fe, Valencia).',
        'doctora-luz-3': 'PhD with Outstanding Cum Laude (University of Valencia): "Early knee osteoarthritis. Clinical review of diagnostic criteria".',
        'doctora-luz-4': 'Master\'s degree and specific courses in musculoskeletal ultrasound, ultrasound-guided interventionism and shock waves.',
        // Footer
        'footer-nosotros': 'ABOUT US',
        'footer-especialistas': 'Specialists in Traumatology, Radiology and Rehabilitation.',
        'footer-donde': 'WHERE TO FIND US',
        'footer-horario': 'SCHEDULE',
        'footer-horario-text': 'Monday - Friday: 4:00 PM - 8:00 PM',
        'footer-horario-sabado': 'Saturdays: 9:00 AM - 2:00 PM',
        'footer-horario-domingo': 'Sundays: Closed',
        'footer-cita': 'APPOINTMENT',
        'footer-cita-text': 'Before visiting the center, it is necessary to make an appointment by phone or email.',
        'footer-pedir-cita': 'Request Appointment',
        // Gallery
        'gallery-title': 'Our Clinic',
        'gallery-description': 'Maldonado&Herrero Joint and Musculoskeletal Pain Clinic is located in the heart of Madrid (O\'Donnell Street 25)',
        // Contact Form Services
        'contact-service-1': 'Specialist doctor consultation (with ultrasound option)',
        'contact-service-2': 'Ultrasound',
        'contact-service-3': 'Ultrasound-guided infiltration treatment or ultrasound-guided percutaneous technique',
        'contact-service-4': 'Peripheral nerve block',
        'contact-service-5': 'Focal shock wave treatment',
        'contact-service-6': 'Other',
        'contact-description': 'Please explain the reason and if you have already performed imaging tests and which ones (X-ray, Ultrasound, CT, MRI...)',
        // Contact Modal
        'contact-modal-title': 'Contact',
        'contact-label-name': 'Full Name',
        'contact-label-email': 'Email',
        'contact-label-phone': 'Phone',
        'contact-label-service': 'Service of interest',
        'contact-select-service': 'Select a service',
        'contact-label-message': 'Message',
        'contact-submit-button': 'Send Message',
        // Footer Links
        'footer-privacy': 'Privacy Policy',
        'footer-cookies': 'Cookie Policy',
        'footer-legal': 'Legal Notice',
        // Notification Messages
        'notification-required-fields': 'Please complete the required fields.',
        'notification-invalid-email': 'Please enter a valid email address.',
        'notification-sending': 'Sending message...',
        'notification-success': 'Message sent successfully! We will contact you soon.',
        'notification-error': 'Error sending message. ',
        'notification-error-template': 'Please verify that the Template IDs are configured correctly in EmailJS.',
        'notification-error-fields': 'Please verify that all form fields are complete.',
        'notification-error-retry': 'Please try again or contact us directly by phone.'
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
            // For option elements, update textContent; for others, update textContent
            if (element.tagName === 'OPTION') {
                element.textContent = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
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
