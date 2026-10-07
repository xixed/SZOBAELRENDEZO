# SZOBAELRENDEZO

A full-stack web application for room arrangement and management, built with JavaScript, C#, HTML, and CSS.

## Project Overview

SZOBAELRENDEZO (Room Arrangement in Hungarian) is a comprehensive web application designed for organizing and managing room layouts and arrangements. The project uses a modern full-stack architecture with separated frontend and backend components.

## Technology Stack

- **Frontend**: JavaScript (60.7%), HTML (14.6%), CSS (5.2%)
- **Backend**: C# (19.5%)
- **Architecture**: Client-Server with separate FRONTEND and BACKEND directories

## Project Structure

```
SZOBAELRENDEZO/
├── FRONTEND/          # Web UI and client-side application
│   ├── HTML/         # HTML markup and page structure
│   ├── CSS/          # Styling and layout
│   └── JavaScript/   # Client-side logic and interactivity
│
├── BACKEND/           # Server-side API and business logic
│   └── C#/           # Backend services and data processing
│
└── .gitignore        # Git ignore rules
```

### Frontend

The frontend directory contains:
- **HTML**: Page structure and DOM elements
- **CSS**: Responsive styling and design
- **JavaScript**: Client-side logic, API communication, and user interactions

### Backend

The backend directory contains:
- **C# API**: Server-side business logic and room arrangement algorithms
- **Data Processing**: Room layout calculation and management
- **API Endpoints**: RESTful or web service endpoints for frontend communication

## Features

- **Room Layout Management**: Create and organize room arrangements
- **Interactive UI**: Responsive web interface for managing room configurations
- **Full-Stack Integration**: Seamless communication between frontend and backend
- **Cross-Platform**: Web-based application accessible from any browser

## Getting Started

### Prerequisites

- **For Frontend**: 
  - Web browser (Chrome, Firefox, Safari, Edge)
  - Text editor or IDE for viewing/editing code

- **For Backend**:
  - [.NET Framework](https://dotnet.microsoft.com/download) or [.NET Core](https://dotnet.microsoft.com/download)
  - C# development environment (Visual Studio, Visual Studio Code with C# extension)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/xixed/SZOBAELRENDEZO.git
   cd SZOBAELRENDEZO
   ```

2. **Frontend Setup**:
   - Open `FRONTEND/index.html` in a web browser
   - Or use a local web server:
     ```bash
     cd FRONTEND
     # Python 3
     python -m http.server 8000
     # Or Node.js
     npx http-server
     ```

3. **Backend Setup**:
   ```bash
   cd BACKEND
   # Restore dependencies
   dotnet restore
   # Build the project
   dotnet build
   # Run the application
   dotnet run
   ```

### Running the Application

#### Frontend
- Open `FRONTEND/index.html` directly in a browser, or
- Start a local web server and navigate to `http://localhost:8000`

#### Backend
- Run from the BACKEND directory:
  ```bash
  dotnet run
  ```
- The API will typically be available at `http://localhost:5000` or as configured

## API Communication

The frontend communicates with the backend API using HTTP requests (fetch API or similar). Ensure:
- Backend server is running
- Frontend is configured with the correct backend API URL
- CORS (Cross-Origin Resource Sharing) is properly configured if on different domains

## Development

### Project Organization

- Keep frontend assets organized by type (HTML, CSS, JavaScript)
- Place API calls in dedicated JavaScript modules
- Implement data models in the C# backend
- Use consistent naming conventions across both tiers

### Building

```bash
# Frontend: No build step required, static files
# Backend: 
dotnet build --configuration Release
```

### Deployment

- **Frontend**: Deploy the FRONTEND folder to a web server or static hosting service
- **Backend**: Deploy the compiled C# application to a server with .NET runtime

## Repository Information

- **Created**: May 6, 2025
- **Last Updated**: Recently
- **Default Branch**: master
- **Language Composition**: 
  - JavaScript: 60.7%
  - C#: 19.5%
  - HTML: 14.6%
  - CSS: 5.2%
- **License**: Not specified

## Project Name

"SZOBAELRENDEZO" is Hungarian for "Room Arrangement" or "Room Organizer," reflecting the application's core purpose of managing and organizing room layouts.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## Resources

- [MDN Web Docs](https://developer.mozilla.org/) - JavaScript and web development reference
- [C# Documentation](https://docs.microsoft.com/en-us/dotnet/csharp/) - C# language reference
- [ASP.NET Documentation](https://docs.microsoft.com/en-us/aspnet/) - Backend framework documentation
- [GitHub Repository](https://github.com/xixed/SZOBAELRENDEZO)

## Support

For issues, questions, or suggestions, please open an issue on the [GitHub Issues](https://github.com/xixed/SZOBAELRENDEZO/issues) page.

## License

This project is publicly available on GitHub. See repository settings for license information.

---

Built with JavaScript, C#, HTML, and CSS for efficient room arrangement and management.
