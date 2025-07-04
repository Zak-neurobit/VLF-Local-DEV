const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vasquez Law Firm - AI-Powered Legal Services</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        .float-animation {
            animation: float 6s ease-in-out infinite;
        }
        .gradient-text {
            background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    </style>
</head>
<body class="bg-gradient-to-b from-slate-50 to-white">
    <!-- Navigation -->
    <nav class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <h1 class="text-2xl font-bold gradient-text">Vasquez Law Firm</h1>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="#" class="text-gray-700 hover:text-blue-600">Attorneys</a>
                    <a href="#" class="text-gray-700 hover:text-blue-600">Practice Areas</a>
                    <a href="#" class="text-gray-700 hover:text-blue-600">Client Portal</a>
                    <a href="#" class="text-gray-700 hover:text-blue-600">Contact</a>
                    <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Free Consultation
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 class="text-5xl font-bold text-gray-900 mb-6">
                        Legal Services Powered by 
                        <span class="gradient-text">Artificial Intelligence</span>
                    </h2>
                    <p class="text-xl text-gray-600 mb-8">
                        Experience the future of legal services with 24/7 AI assistants, 
                        real-time case tracking, and instant answers to your legal questions.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <button onclick="showAIAssistant()" class="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all">
                            Talk to AI Assistant
                        </button>
                        <button class="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50">
                            Schedule Human Attorney
                        </button>
                    </div>
                    <div class="mt-8 flex items-center gap-6">
                        <div class="flex items-center">
                            <div class="flex -space-x-2">
                                <div class="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"></div>
                                <div class="w-10 h-10 rounded-full bg-gray-400 border-2 border-white"></div>
                                <div class="w-10 h-10 rounded-full bg-gray-500 border-2 border-white"></div>
                                <div class="w-10 h-10 rounded-full bg-gray-600 border-2 border-white"></div>
                            </div>
                            <p class="ml-3 text-sm text-gray-600">
                                <span class="font-semibold">2,847</span> clients served
                            </p>
                        </div>
                        <div class="flex items-center">
                            <span class="text-yellow-400 text-xl">★★★★★</span>
                            <span class="ml-2 text-sm text-gray-600">4.9/5 rating</span>
                        </div>
                    </div>
                </div>
                <div class="relative">
                    <div class="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <div class="text-center text-white">
                            <div class="text-6xl mb-4 float-animation">🤖</div>
                            <h3 class="text-3xl font-bold mb-2">AI Legal Assistant</h3>
                            <p class="text-xl">Available 24/7</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- AI Features Grid -->
    <section class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h3 class="text-4xl font-bold text-gray-900 mb-4">AI-Powered Legal Services</h3>
                <p class="text-xl text-gray-600">Revolutionary technology meets legal expertise</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div class="text-4xl mb-4">🤖</div>
                    <h4 class="text-xl font-semibold mb-2">24/7 AI Legal Assistant</h4>
                    <p class="text-gray-600">Get instant answers in English or Spanish</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div class="text-4xl mb-4">📊</div>
                    <h4 class="text-xl font-semibold mb-2">Predictive Analytics</h4>
                    <p class="text-gray-600">85% accuracy in case outcome predictions</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div class="text-4xl mb-4">🔍</div>
                    <h4 class="text-xl font-semibold mb-2">Smart Documents</h4>
                    <p class="text-gray-600">AI-generated legal documents in minutes</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div class="text-4xl mb-4">🎯</div>
                    <h4 class="text-xl font-semibold mb-2">Real-Time Tracking</h4>
                    <p class="text-gray-600">Track USCIS cases and court dates automatically</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div class="text-4xl mb-4">🔐</div>
                    <h4 class="text-xl font-semibold mb-2">Blockchain Evidence</h4>
                    <p class="text-gray-600">Tamper-proof document verification</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div class="text-4xl mb-4">🎤</div>
                    <h4 class="text-xl font-semibold mb-2">Voice Authentication</h4>
                    <p class="text-gray-600">Bank-level biometric security</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Chat Widget -->
    <div id="chatWidget" class="fixed bottom-6 right-6 z-50">
        <button onclick="toggleChat()" class="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
        </button>
    </div>

    <!-- AI Assistant Modal -->
    <div id="aiModal" class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl p-6 max-w-2xl w-full">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-2xl font-bold">AI Legal Assistant</h3>
                <button onclick="hideAIAssistant()" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 text-center">
                <div class="text-8xl mb-4">🤖</div>
                <p class="text-lg text-gray-700">Click the microphone to start speaking</p>
                <button class="mt-4 bg-red-500 text-white rounded-full p-4 hover:bg-red-600 transition-colors">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <script>
        function toggleChat() {
            alert('Chat widget would open here!');
        }
        
        function showAIAssistant() {
            document.getElementById('aiModal').classList.remove('hidden');
            document.getElementById('aiModal').classList.add('flex');
        }
        
        function hideAIAssistant() {
            document.getElementById('aiModal').classList.add('hidden');
            document.getElementById('aiModal').classList.remove('flex');
        }
    </script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.url}`);

  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
  } else if (req.url === '/placeholder.svg') {
    const svgPath = path.join(__dirname, 'public', 'placeholder.svg');
    fs.readFile(svgPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`
🚀 Vasquez Law Firm Demo Server Running!
🌐 Open your browser to: http://localhost:${PORT}

Features demonstrated:
- AI-powered legal assistant interface
- Modern, responsive design
- Interactive chat widget
- Voice assistant modal
- Real-time features showcase

Press Ctrl+C to stop the server.
    `);
});
