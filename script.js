document.addEventListener('DOMContentLoaded', () => {
  
  // Set default date to today
  const dateInput = document.getElementById('travelDate');
  const today = new Date().toISOString().split('T')[0];
  if(dateInput) {
    dateInput.value = today;
    dateInput.min = today;
  }

  // Handle Swap Stations
  const swapBtn = document.getElementById('swapBtn');
  const fromInput = document.getElementById('fromStation');
  const toInput = document.getElementById('toStation');

  if(swapBtn) {
    swapBtn.addEventListener('click', () => {
      const temp = fromInput.value;
      fromInput.value = toInput.value;
      toInput.value = temp;
      
      // small animation effect on inputs
      fromInput.parentElement.style.transform = "scale(1.05)";
      toInput.parentElement.style.transform = "scale(1.05)";
      
      setTimeout(() => {
        fromInput.parentElement.style.transform = "scale(1)";
        toInput.parentElement.style.transform = "scale(1)";
      }, 200);
    });
  }

  // Handle Search Submission and Results
  const form = document.getElementById('bookView');
  const resultsSection = document.getElementById('resultsSection');
  const resultsContainer = document.getElementById('resultsContainer');

  if(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Stop button glowing after clicking
      form.querySelector('button[type="submit"]').classList.remove('btn-glow');

      // Expand to Results
      resultsSection.classList.remove('hidden');
      
      // Smooth scroll to results
      setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

      // Render skeleton loaders
      resultsContainer.innerHTML = '';
      for(let i = 0; i < 3; i++) {
        resultsContainer.innerHTML += '<div class="skeleton-card"></div>';
      }

      // Simulate network request
      setTimeout(() => {
        renderMockResults(fromInput.value, toInput.value);
      }, 1500);
    });
  }

  function renderMockResults(from, to) {
    const defaultFrom = from || 'New Delhi';
    const defaultTo = to || 'Mumbai';

    const mockTrains = [
      {
        name: "RAJDHANI EXP",
        number: "12952",
        departure: "16:55",
        arrival: "08:35",
        duration: "15h 40m",
        classes: [
          { type: '3A', status: 'AVAILABLE 14', color: '#16a34a' },
          { type: '2A', status: 'WL 5', color: '#ea580c' },
          { type: '1A', status: 'AVAILABLE 2', color: '#16a34a' }
        ]
      },
      {
        name: "AK TEJAS RAJ EX",
        number: "12954",
        departure: "17:15",
        arrival: "10:05",
        duration: "16h 50m",
        classes: [
          { type: '3A', status: 'RAC 12', color: '#ea580c' },
          { type: '2A', status: 'AVAILABLE 31', color: '#16a34a' },
          { type: '1A', status: 'WL 1', color: '#dc2626' }
        ]
      },
      {
        name: "GARIB RATH EXP",
        number: "12910",
        departure: "16:30",
        arrival: "09:15",
        duration: "16h 45m",
        classes: [
          { type: '3A', status: 'AVAILABLE 120', color: '#16a34a' },
          { type: 'CC', status: 'AVAILABLE 45', color: '#16a34a' }
        ]
      }
    ];

    resultsContainer.innerHTML = '';

    mockTrains.forEach((train, index) => {
      // Delay animation for each card
      const delay = index * 0.1;

      let classesHTML = '';
      train.classes.forEach(cls => {
        classesHTML += `
          <div class="cls-box">
            <span>${cls.type}</span>
            <span class="cls-status" style="color: ${cls.color}">${cls.status}</span>
          </div>
        `;
      });

      const card = document.createElement('div');
      card.className = 'train-card';
      card.style.animationDelay = `${delay}s`;
      
      card.innerHTML = `
        <div class="train-info">
          <h3>${train.name} <span class="train-number">${train.number}</span></h3>
          <div class="train-timing">
            <span>${train.departure} | ${defaultFrom}</span>
            <span style="color: #64748b;">— ${train.duration} —</span>
            <span>${train.arrival} | ${defaultTo}</span>
          </div>
        </div>
        <div class="train-availability">
          ${classesHTML}
          <button class="btn btn-primary" style="margin-left: 10px;">Book Now</button>
        </div>
      `;

      resultsContainer.appendChild(card);
    });
  }

  // Handle Tabs Navigation
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      tabContents.forEach(tc => {
        tc.classList.remove('active-view');
        tc.classList.add('hidden');
      });

      const targetId = tab.getAttribute('data-target');
      if (targetId) {
        const targetView = document.getElementById(targetId);
        if (targetView) {
          targetView.classList.remove('hidden');
          targetView.classList.add('active-view');
        }
      }
    });
  });

  // Handle Auth Modal
  const authModal = document.getElementById('authModal');
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalTitle = document.getElementById('modalTitle');
  const authForm = document.getElementById('authForm');

  if(authModal) {
    loginBtn.addEventListener('click', () => {
      modalTitle.innerText = "Login to IRCTC NextGen";
      authModal.classList.remove('hidden');
    });

    registerBtn.addEventListener('click', () => {
      modalTitle.innerText = "Register for IRCTC NextGen";
      authModal.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', () => {
      authModal.classList.add('hidden');
    });

    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Authentication feature is functional (mock success).");
      authModal.classList.add('hidden');
    });
  }

  // Handle forms in PNR and Charts
  const pnrView = document.getElementById('pnrView');
  if (pnrView) {
    pnrView.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Mock PNR Request sent! Status: Confirmed.");
    });
  }

  const chartsView = document.getElementById('chartsView');
  if (chartsView) {
    chartsView.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Fetching mock charts... No vacancy found.");
    });
  }

  // Book now buttons
  document.addEventListener('click', (e) => {
    if(e.target && e.target.innerText === "Book Now") {
      alert("Proceeding to mock payment gateway...");
    }
  });

  // --- Chatbot Logic ---
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotContainer = document.getElementById('chatbotContainer');
  const closeChatbot = document.getElementById('closeChatbot');
  const chatbotForm = document.getElementById('chatbotForm');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotMessages = document.getElementById('chatbotMessages');

  if(chatbotToggle) {
    // Open chat
    chatbotToggle.addEventListener('click', () => {
      chatbotContainer.classList.remove('hidden');
      chatbotToggle.style.display = 'none';
      chatbotInput.focus();
    });

    // Close chat
    closeChatbot.addEventListener('click', () => {
      chatbotContainer.classList.add('hidden');
      chatbotToggle.style.display = 'flex';
    });

    // Handle send message
    chatbotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userText = chatbotInput.value.trim();
      if(!userText) return;

      // Add user message
      addChatMessage(userText, 'user-message');
      chatbotInput.value = '';

      // Mock bot typing and response
      setTimeout(() => {
        let botResponse = "I'm still learning! You can ask me about checking your PNR, finding trains, or e-catering.";
        const lowerText = userText.toLowerCase();

        if(lowerText.includes('pnr')) {
          botResponse = "To check your PNR, please click the 'PNR Status' tab in the main booking widget and enter your 10-digit number.";
        } else if (lowerText.includes('book') || lowerText.includes('train')) {
          botResponse = "You can search for trains by using the 'Book Ticket' tab. Just enter your source, destination, and hit Search.";
        } else if (lowerText.includes('hi') || lowerText.includes('hello')) {
          botResponse = "Hello there! Where are you planning to travel today?";
        }

        addChatMessage(botResponse, 'bot-message');
      }, 600);
    });
  }

  function addChatMessage(text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${className}`;
    msgDiv.innerText = text;
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

});
