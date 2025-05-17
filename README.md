# SolUX Frontend

SolUX is an AI-powered UI builder that helps you create beautiful user interfaces through natural language prompts. Built with Next.js and modern web technologies, it provides an intuitive way to generate and preview UI components in real-time.

## Features

- 🤖 AI-powered UI generation from text prompts
- 🎨 Real-time UI preview
- 📱 Responsive design support
- 🔄 Interactive prompt history
- 🎯 Clean and modern user interface

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- Git

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/SolUX-frontend.git
cd SolUX-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your OpenRouter API key:

```env
OPENROUTER_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── generate-ai/     # AI generation API endpoint
│   ├── ui-builder/         # Main UI builder page
│   └── layout.jsx         # Root layout component
├── components/
│   └── ui/                # Reusable UI components
└── assets/
    └── logos/            # Project logos and images
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [OpenRouter AI](https://openrouter.ai/) - AI model integration
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide Icons](https://lucide.dev/) - Icon library

## API Integration

The project uses OpenRouter's API for AI-powered UI generation. The main integration points are:

- `/api/generate-ai` - Handles AI requests and responses
- Uses Google's Gemini 2.5 Pro model for UI generation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Acknowledgments

- OpenRouter for providing AI capabilities
- Next.js team for the amazing framework
- All contributors who have helped shape this project
