# Supportive Bangladeshi Mother WhatsApp Chatbot

A WhatsApp chatbot that emulates a supportive Bangladeshi mother, built using Azure OpenAI and WhatsApp Web.js. This AI-powered chatbot provides emotional support, cultural advice, and daily encouragement.

## Features

### Core Features
- **Emotional Support**: Provides compassionate, culturally relevant emotional support and guidance
- **Cultural Advice**: Offers advice and tips based on Bangladeshi culture and traditions
- **Daily Encouragement**: Sends daily messages of encouragement and support
- **Life Advice**: Provides practical advice for everyday challenges
- **Positive Affirmations**: Delivers personalized positive affirmations to boost well-being

### Technical Features
- **WhatsApp Integration**: Seamless communication through WhatsApp
- **Azure OpenAI Integration**: Powered by Azure OpenAI for natural, empathetic conversations
- **Conversation Memory**: Maintains conversation context for more helpful responses
- **Command System**: Useful commands for accessing features like daily advice
- **Premium User Support**: Enhanced features for premium subscribers

## Prerequisites

- Azure account with OpenAI access
- Azure subscription with at least $200 monthly credits
- WhatsApp account
- Node.js environment (v14 or higher)

## Monetization Options

This chatbot includes built-in support for the following monetization strategies:

1. **Freemium Model**:
   - Basic version: Free access to emotional support and basic advice
   - Premium version: Extended conversation history, detailed advice, and advanced features

2. **Corporate Wellness Packages**:
   - API for managing multiple users
   - Admin dashboard for employee wellness tracking (requires additional implementation)
   - Bulk user management for corporate clients

3. **Professional Therapist Referrals**:
   - Integration points available for referring users to professional therapy
   - Can be configured to connect with real therapists through a partnership program

## Quick Start

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and update with your Azure OpenAI credentials
4. Start the application:
   ```
   npm start
   ```
5. Scan the QR code with WhatsApp to link your account

## User Commands

Users can interact with the chatbot using the following commands:

- `/help` - Show all available commands
- `/advice` - Get a random piece of life advice
- `/encouragement` - Receive a message of encouragement
- `/affirmation` - Receive a positive affirmation
- `/upgrade` - Learn about premium features
- `/clear` - Clear conversation history

Users can also ask for specific advice by sending messages like "I need advice on studying" or request specific help with phrases like "Give me encouragement for a tough day."

## Cultural Approach

The chatbot provides support based on Bangladeshi cultural principles:

1. **Cultural Relevance**: Offers advice and support that aligns with Bangladeshi traditions and values
2. **Practical Guidance**: Provides practical tips and advice for everyday challenges
3. **Emotional Support**: Offers empathetic and compassionate support
4. **Positive Reinforcement**: Acknowledges and encourages progress

## Production Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Security and Privacy

- All conversations are private and secure
- Data is stored in memory by default (production deployments should use a database)
- No personal information is shared with third parties
- Users can clear their conversation history at any time

## License

MIT