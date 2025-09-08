# Oecora

A modern React-based application that combines AI-powered chat assistance with interactive diagram creation and editing capabilities.

## Features

- 🤖 **AI Chat Assistant**: Interactive chat interface for generating diagrams and getting assistance
- 🎨 **Diagram Editor**: Integrated draw.io canvas for creating and editing complex diagrams
- 📊 **Diagram Viewer**: View and interact with saved diagrams
- 🔄 **Auto-save**: Automatic diagram saving to local storage
- 📱 **Responsive Design**: Mobile-friendly interface with drawer navigation
- 🎯 **Modern UI**: Built with TailwindCSS and DaisyUI for a clean, professional look

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS + DaisyUI
- **Routing**: React Router DOM
- **Diagram Tools**: 
  - draw.io integration (for interactive editing)
- **Icons**: React Icons
- **Development**: ESLint + TypeScript ESLint

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd oecora
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Usage

### Home Page
The home page provides navigation to the main features:
- **Chat**: Access the AI-powered chat assistant
- **Canvas**: Open the diagram editor

### Chat Assistant
Navigate to `/chat` to access the AI chat interface:
- Type messages to interact with the AI assistant
- The assistant can generate diagrams based on your requests
- Upload files for context or analysis
- View generated diagrams directly in the chat

### Diagram Editor (Canvas)
Navigate to `/canvas` to access the draw.io-based diagram editor:
- Create new diagrams from scratch
- Edit existing diagrams loaded from storage
- Auto-save functionality preserves your work
- Export diagrams in various formats
- Import existing .drawio files

### Key Features:

#### Auto-save
- Diagrams are automatically saved to browser local storage
- View last saved timestamp in the editor
- Restore previous work when returning to the application

#### File Operations
- **Import**: Load existing .drawio files
- **Export**: Download diagrams as .drawio files
- **Refresh**: Reset the editor to start fresh

#### Navigation
- Responsive drawer navigation on mobile
- Fixed sidebar on larger screens
- Easy switching between Chat and Canvas modes

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── App.tsx          # Main application with routing
├── App.css          # Application styles
├── Canva.tsx        # Draw.io diagram editor component
├── DrawioChart.tsx  # Diagram viewer component
├── main.tsx         # Application entry point
├── index.css        # Global styles
├── assets/          # Static assets
└── vite-env.d.ts    # Vite type definitions
```

## Key Components

### App.tsx
Main application component containing:
- Router configuration
- Layout component with responsive navigation
- Home page with feature cards
- Chat interface with AI integration
- Route definitions

### Canva.tsx
Diagram editor component featuring:
- draw.io integration via react-drawio
- Auto-save functionality
- File import/export capabilities
- Real-time diagram editing

### DrawioChart.tsx
Diagram viewer component that:
- Displays diagrams in read-only mode
- Provides edit functionality
- Handles diagram encoding for draw.io viewer

## Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Development

### Adding New Features
1. Create new components in the `src/` directory
2. Add routes in `App.tsx` if needed
3. Update navigation in the Layout component
4. Follow TypeScript best practices

### Styling
- Use TailwindCSS classes for styling
- Leverage DaisyUI components when appropriate
- Maintain consistent design patterns

## Troubleshooting

### Common Issues

1. **Draw.io not loading**: Ensure you have a stable internet connection as the editor loads from `embed.diagrams.net`

2. **Diagrams not saving**: Check browser local storage permissions and available space

3. **Build errors**: Run `npm run lint` to check for TypeScript/ESLint errors

### Browser Console
Check the browser developer console for any error messages that can help diagnose issues.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.