// Chatbot Responses Database
const botResponses = {
  greeting: [
    "Hi! I'm NEXUS, created by John Michael to help you learn about animal poaching. How can I assist you today?",
    "Hello! I'm here to share information about wildlife conservation and anti-poaching efforts. What interests you?",
    "Welcome! Feel free to ask me anything about wildlife protection and conservation."
  ],
  poaching: [
    "Poaching is the illegal hunting of wildlife for profit. It's a major threat to endangered species like elephants, rhinos, and tigers. We work to combat this through ranger patrols and technology.",
    "Animal poaching kills thousands of endangered animals every year. NEXUS uses AI, GPS tracking, and international cooperation to stop poachers and save wildlife."
  ],
  elephants: [
    "African elephants are hunted for their ivory tusks. Over 20,000 elephants are poached annually. We use GPS tracking, ranger patrols, and demand reduction campaigns to protect them.",
    "Elephants are one of our priority species. NEXUS protects them through technology, on-ground patrols, and working with Asian markets to reduce ivory demand."
  ],
  rhinos: [
    "Rhinos are critically endangered, with over 500 poached yearly for their horns. We protect them through intensive patrols, dehorning programs, and international horn trade bans.",
    "Rhino poaching is a critical crisis. We run 24/7 protection patrols and work to eliminate demand for horns in traditional medicine markets."
  ],
  tigers: [
    "Only 3,900 wild tigers remain. They're hunted for bones, skins, and organs used in traditional medicine. We expand protected reserves and promote alternatives to tiger-based products.",
    "Tigers are facing extinction from poaching. NEXUS focuses on reserve protection, ranger expansion, and consumer education to save this species."
  ],
  habitat: [
    "Habitat restoration is critical for wildlife survival. We create protected spaces and wildlife corridors to help poached species recover and populations grow.",
    "We restore natural habitats to give endangered animals safe spaces to recover and thrive. Habitat protection is part of our comprehensive conservation strategy."
  ],
  donate: [
    "Your donation helps fund our anti-poaching operations, ranger patrols, and technology. Every contribution saves wildlife! Click DONATE to help.",
    "Support NEXUS to protect endangered animals worldwide. Your donation funds on-ground operations and innovative technologies to combat poaching."
  ],
  contact: [
    "You can reach us at info@nexuswildlife.org or call +1-800-WILDLIFE. Follow us on Instagram @apoc_africa for the latest updates!",
    "Contact NEXUS to get involved! Email us, follow our social media, or visit our contact page to learn how you can help."
  ],
  ai: [
    "NEXUS AI is an intelligent system that provides instant information about poaching threats, identifies hotspots, and helps coordinate anti-poaching efforts worldwide.",
    "Our AI technology analyzes data to predict poaching patterns and help rangers protect endangered animals more effectively."
  ]
};

// Keywords for matching user input
const keywordMap = {
  'poach|poaching|poacher|hunt|hunting': 'poaching',
  'elephant|ivory|tusk': 'elephants',
  'rhino|horn': 'rhinos',
  'tiger|tigers': 'tigers',
  'habitat|restore|ecosystem|reserve': 'habitat',
  'donate|donation|support|contribute|help': 'donate',
  'contact|email|phone|reach|call': 'contact',
  'ai|artificial|intelligence|nexus ai': 'ai',
  'hi|hello|hey|greetings?|what\'s up|howdy': 'greeting'
};

// DOM Elements
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const closeBtn = document.getElementById('closeBtn');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');

// Initialize when DOM is ready
function initChatbot() {
  if (!chatbotContainer || !chatbotToggle) {
    console.error('Chatbot elements not found');
    return;
  }

  // Hide chatbot on load
  chatbotContainer.classList.add('hidden');

  // Toggle chatbot visibility
  chatbotToggle.addEventListener('click', toggleChatbot);
  closeBtn.addEventListener('click', closeChatbot);

  // Send message on button click
  sendBtn.addEventListener('click', sendMessage);

  // Send message on Enter key
  userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });
}

function toggleChatbot() {
  if (chatbotContainer.classList.contains('hidden')) {
    // Open chatbot
    chatbotContainer.classList.remove('hidden');
    chatbotToggle.classList.add('hidden');
    setTimeout(() => userInput.focus(), 100);
  } else {
    // Close chatbot
    chatbotContainer.classList.add('hidden');
    chatbotToggle.classList.remove('hidden');
  }
}

function closeChatbot() {
  chatbotContainer.classList.add('hidden');
  chatbotToggle.classList.remove('hidden');
}

function sendMessage() {
  const message = userInput.value.trim();

  if (message === '') return;

  // Add user message
  addMessage(message, 'user');

  // Clear input
  userInput.value = '';

  // Get bot response
  const botReply = getBotResponse(message);

  // Add bot response with slight delay
  setTimeout(() => {
    addMessage(botReply, 'bot');
  }, 500);
}

function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender + '-message');

  const paragraph = document.createElement('p');
  paragraph.textContent = text;

  messageDiv.appendChild(paragraph);
  chatMessages.appendChild(messageDiv);

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  // Check keywords
  for (const [keywords, category] of Object.entries(keywordMap)) {
    const regex = new RegExp(keywords, 'i');
    if (regex.test(lowerMessage)) {
      const responses = botResponses[category];
      if (responses && responses.length > 0) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
  }

  // Default response
  const defaultResponses = [
    "That's a great question! For more information, check out our ABOUT, PROJECT, or CONTACT sections. You can also ask me anything about poaching, conservation, or how to help!",
    "I'm here to help with questions about wildlife and anti-poaching efforts. Feel free to ask about elephants, rhinos, tigers, or how to support our mission!",
    "Not sure about that one, but I can help with info about poaching, endangered species, or how to get involved with NEXUS. What would you like to know?"
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Start chatbot when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatbot);
} else {
  initChatbot();
}