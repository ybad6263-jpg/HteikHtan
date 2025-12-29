    document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Variable Definitions ---
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');

    //const nextButton = document.querySelector('.next-button');
    //const prevButton = document.querySelector('.prev-button');
    const sliderContainer = document.querySelector('.backhero'); // The main slider area

    let currentSlide = 0;
    let slideInterval;
    let dots; // Will store the dot elements after creation
    
    // Configuration
    const autoSlideDelay = 6000; // 6 seconds
    const minSwipeDistance = 50; // Minimum pixels for a recognized swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    // --- 2. Core Logic Functions ---

    // Function to show a specific slide index
    function showSlide(index) {
        // Set the validated index as the current slide
        currentSlide = index; 

        // 1. Update slides visibility (CSS transition handles the fade)
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');

        // 2. Update dots indicator
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    // Function to move to the next slide, handling array wrap
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length; 
        showSlide(nextIndex);
    }

    // Function to move to the previous slide, handling array wrap
    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length; 
        showSlide(prevIndex);
    }
    
    // --- 3. Auto-Slide Control ---

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, autoSlideDelay);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // --- 4. Touch/Swipe Handling ---
    
    function handleGesture() {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                prevSlide(); // Swiped right
            } else {
                nextSlide(); // Swiped left
            }
            resetAutoSlide();
        }
    }

    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide(); // Pause slider while touching
    }, false);

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
        startAutoSlide(); // Resume slider after touch ends
    }, false);
    
    // --- 5. Initialization ---

    // Create navigation dots dynamically
    function createDots() {
        slides.forEach((slide, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                showSlide(index);
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
        });
        // Important: Assign the created dots to the global 'dots' variable
        dots = document.querySelectorAll('.dot'); 
    }

    // Manual Controls (Arrows)
    //nextButton.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
    //prevButton.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

    // Pause on Hover/Focus (UX/Accessibility)
    /*
    [sliderContainer, nextButton, prevButton].forEach(el => {
        el.addEventListener('mouseenter', stopAutoSlide);
        el.addEventListener('mouseleave', startAutoSlide);
        el.addEventListener('focusin', stopAutoSlide);
        el.addEventListener('focusout', startAutoSlide);
    });
*/
    // Run Initial Setup
    createDots();
    showSlide(currentSlide);
    startAutoSlide();
});
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    if (menuToggle.innerHTML == "☰") 
        {
    menuToggle.innerHTML = "x";
        }
       else {
            menuToggle.innerHTML = "☰";
        }
});


//ano json
fetch('assests/data/annoucement.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load announcements');
    }
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('announcement-list');

    if (!container) return;

    // Clear in case of re-render
    container.innerHTML = '';

    // Show latest first (optional but nice)
    data.reverse().forEach(item => {
      const div = document.createElement('div');
      div.className = 'announcement-item';

      div.innerHTML = `
        <h4>${item.title}</h4>
        <small>${item.date}</small>
        <p>${item.message}</p>
      `;

      container.appendChild(div);
    });
  })
  .catch(error => {
    console.error(error);
  });


// AI

// 1. Your 'Knowledge Base' (You can expand this easily)
const schoolData = {
    "fees": "For the 2025-2026 academic year, fees range from 200,000 to 500,000 MMK depending on the grade level. Please visit the office for a detailed breakdown.",
    "location": "HteikHtan is located in Mandalay, Pyigyithagon Township, on Street 60c.",
    "admission": "Admissions are currently open for Preschool to Grade 11. You need a copy of the birth certificate and previous school records.",
    "hours": "The school office is open Monday to Friday, 8:00 AM to 4:00 PM.",
    "default": "I'm sorry, I don't know the answer to that yet. Please use the Contact Form below to ask our secretary directly!"
};

// 2. The function that connects the button to the answer
function askAI() {
    // Get what the user typed
    const inputField = document.getElementById("userQuery");
    const query = inputField.value.toLowerCase();
    
    // Get the area where we want to show the answer
    const responseArea = document.getElementById("aiResponse");

    // Simple "Logic Engine" for 2026
    if (query.includes("fee") || query.includes("cost") || query.includes("သင်တန်းကြေး")) {
        responseArea.innerText = schoolData.fees;
    } 
    else if (query.includes("location") || query.includes("where") || query.includes("နေရာ")) {
        responseArea.innerText = schoolData.location;
    } 
    else if (query.includes("admission") || query.includes("enroll") || query.includes("ကျောင်းအပ်")) {
        responseArea.innerText = schoolData.admission;
    }
    else if (query.includes("time") || query.includes("open") || query.includes("နာရီ")) {
        responseArea.innerText = schoolData.hours;
    }
    else {
        responseArea.innerText = schoolData.default;
    }
    
    // Clear the input field after asking
    inputField.value = "";
}

// three dot

const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the slower

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            // Lower inc means smoother animation
            const inc = target / speed;

            if (count < target) {
                // Add the increment and round up
                counter.innerText = Math.ceil(count + inc);
                // Call function every 1ms
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target + "+"; // Add the plus sign back at the end
            }
        };
        updateCount();
    });
};

// --- Optional: Start animation only when user scrolls to it ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            startCounters();
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.stats-section'));
/*
// 1. Setup Connection
const _supabase = supabase.createClient('Yhttps://gulbjsgcthpsmdmdoxwa.supabase.co', 'YeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1bGJqc2djdGhwc21kbWRveHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MjY5MDEsImV4cCI6MjA4MjUwMjkwMX0.FSqiZhuXkd156kUmT8eHlWa3628rsQmzEi9n2bBJTq4');

async function fetchData() {
    // 2. Fetch Stats (Student/Teacher counts)
    const { data: stats } = await _supabase.from('school_stats').select('*').single();
    
    if (stats) {
        document.getElementById('student-count').innerText = stats.students + "+";
        document.getElementById('teacher-count').innerText = stats.teachers + "+";
    }

    // 3. Fetch Announcements
    const { data: news } = await _supabase.from('supaannouncements').select('*').order('created_at', { ascending: false });

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = news.map(item => `
        <div class="news-card">
            <h3>${item.title}</h3>
            <p>${item.content}</p>
            <small>${new Date(item.created_at).toLocaleDateString()}</small>
        </div>
    `).join('');
}

fetchData();
**/