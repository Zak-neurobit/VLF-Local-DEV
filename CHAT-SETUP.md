# Chat Widget Setup Guide

## Quick Start (5 minutes)

1. **Run the setup script:**
   ```bash
   ./scripts/quick-setup.sh
   ```

2. **Add your OpenAI API key:**
   - Open `.env.local` in your editor
   - Find the line `OPENAI_API_KEY=sk-your-openai-api-key-here`
   - Replace with your actual OpenAI API key
   - Get one at: https://platform.openai.com/api-keys

3. **Start the development server:**
   ```bash
   npm run dev:next
   ```

4. **Open the website:**
   - Go to http://localhost:3000
   - The chat widget will appear in the bottom right corner
   - Click it to start chatting!

## Features

- ✅ English and Spanish support
- ✅ AI-powered legal information
- ✅ Quick action buttons (Call, Schedule Appointment)
- ✅ Pre-defined questions
- ✅ Contact form after 3 messages
- ✅ Mobile responsive

## Troubleshooting

### Chat shows "I'm sorry, the chat service is unavailable"
- **Cause:** OpenAI API key is not configured
- **Fix:** Add your OpenAI API key to `.env.local`

### Chat shows "Failed to send message"
- **Cause:** Network error or server not running
- **Fix:** Make sure the development server is running with `npm run dev:next`

### Chat is stuck on "Connecting..."
- **Cause:** This was the original issue - now fixed!
- **Fix:** Pull the latest changes

## Configuration Options

### Basic Configuration (in `.env.local`):
```env
# Required for chat to work
OPENAI_API_KEY=sk-your-openai-api-key-here

# Optional - defaults are fine for development
DATABASE_URL=postgresql://postgres:password@localhost:5432/vasquez_law
MOCK_EMAIL=true
MOCK_SMS=true
```

### Advanced Configuration:
- GoHighLevel CRM integration
- Email notifications
- SMS notifications
- Custom AI models

See `.env.example` for all available options.

## How It Works

1. **User opens chat** → Welcome message appears
2. **User sends message** → Message sent to `/api/chat` endpoint
3. **API processes message** → OpenAI generates response
4. **Response displayed** → User sees AI response
5. **After 3 messages** → Contact form appears (optional)

## Development Tips

- The chat works without a database (uses in-memory storage)
- Email/SMS are mocked by default in development
- All chat conversations are ephemeral in development
- For production, configure a real database and services

## Need Help?

- Check console for errors (F12 in browser)
- Verify `.env.local` is configured correctly
- Make sure all dependencies are installed: `npm install`
- Try clearing browser cache and cookies