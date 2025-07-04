# STEM Education Project - Frontend

A modern React-based frontend application for the STEM Education Enhancement Project in Tanzania, featuring dynamic API integration and professional UI components.

**Author**: Elia William Mariki (@dawillygene)  
**Version**: 1.0.0  
**Last Updated**: July 4, 2025

## 🎯 Project Overview

This frontend application serves as the digital platform for a STEM education enhancement project aimed at strengthening science education in Tanzanian secondary schools. The platform provides comprehensive information about the project, team members, activities, and resources.

## ✨ Features

### 🏠 Home Page
- Hero section with project introduction
- Featured activities and outcomes
- Call-to-action sections

### 👥 Team Page (Dynamic API Integration)
- Professional table layout displaying team members
- Real-time search functionality with debouncing
- Contact information with clickable links
- Research interests and publication indicators
- Loading states with skeleton components
- Comprehensive error handling and retry functionality

### 📖 About Page (Dynamic API Integration) 
- Background information with rich content support
- Project justification with academic references
- Dynamic objectives display with target metrics
- STEM education benefits listing
- Project statistics and partner information
- Responsive content loading and fallback support

### 📊 Gallery Page
- Image gallery with search and filtering
- Modal view for detailed image inspection
- Responsive grid layout

### 📝 Blog Page
- Article listing with featured posts
- Search and category filtering
- Responsive card layout

### 📞 Contact Page
- Contact form with validation
- Organization information
- Interactive elements

## 🛠 Technology Stack

- **Framework**: React 18+ with Vite
- **Styling**: Tailwind CSS with custom color scheme
- **Animations**: Framer Motion for smooth transitions
- **API Integration**: Custom service layer with error handling
- **Testing**: Vitest with comprehensive unit tests
- **Icons**: Font Awesome
- **Build Tool**: Vite for fast development and building

## 🎨 Design System

### Color Palette
- **Primary**: `#0066CC` (Blue) - Main brand color
- **Secondary**: `#FFAD03` (Orange) - Accent color
- **Tertiary**: `#FD9148` (Light Orange) - Supporting color

### UI Components
- Professional table layouts
- Card-based content display
- Skeleton loading components
- Modal interfaces
- Responsive navigation
- Interactive forms

## 🚀 API Integration

### Team API
- **Endpoint**: `/api/team-members`
- **Features**: Search, pagination, profile management
- **Response Format**: JSON with camelCase fields
- **Documentation**: [Team API Spec](./TEAM_API_SPECIFICATION.md)

### About API
- **Endpoints**: 
  - `/api/about` - Complete about content
  - `/api/about/background` - Background information
  - `/api/about/justification` - Project justification
  - `/api/about/objectives` - Project objectives
  - `/api/about/stem-benefits` - STEM education benefits
  - `/api/about/statistics` - Project statistics
- **Features**: Rich content support, references, metrics
- **Documentation**: [About API Spec](./api_docs/ABOUT_API.md)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BlogComponents/  # Blog-specific components
│   ├── Cards/          # Card components
│   ├── Comments/       # Comment system
│   ├── Common/         # Shared components
│   ├── Gallery/        # Gallery components
│   └── Search/         # Search components
├── constants/          # Static data and configurations
├── layouts/           # Layout components (Header, Footer, Hero)
├── pages/             # Main page components
├── services/          # API service layer
│   ├── api.js         # Base API configuration
│   ├── teamService.js # Team-related API calls
│   └── aboutService.js # About-related API calls
├── styles/            # Custom CSS files
└── tests/             # Unit and integration tests
```

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dawillygene/STEM-PROJECT-FRONT_END.git
   cd stem_website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Configure your API base URL:
   ```env
   VITE_API_BASE_URL=http://your-api-server:8000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint

## 🧪 Testing

The project includes comprehensive unit tests for components and services:

### Component Tests
- Loading state verification
- Error handling testing
- API integration testing
- User interaction testing
- Fallback content validation

### Service Tests
- API endpoint testing
- Error handling verification
- Response format validation
- Parameter handling testing

**Run tests:**
```bash
npm run test
```

**Coverage report:**
```bash
npm run test:coverage
```

## 🔧 API Configuration

### Development
The application uses proxy configuration for development:
```javascript
// vite.config.js
server: {
  proxy: {
    '/api': 'http://localhost:8000'
  }
}
```

### Production
Set the `VITE_API_BASE_URL` environment variable:
```env
VITE_API_BASE_URL=https://your-production-api.com/api
```

## 🎯 Key Features Implemented

### Dynamic Team Page
- ✅ Professional table layout
- ✅ Real-time search with debouncing
- ✅ API integration with error handling
- ✅ Contact information formatting
- ✅ Research interests display
- ✅ Loading states and retry functionality

### Dynamic About Page
- ✅ Background information with HTML support
- ✅ Project justification with references
- ✅ Dynamic objectives with metrics
- ✅ STEM benefits listing
- ✅ Statistics and partner displays
- ✅ Fallback content for offline mode

### Professional UI/UX
- ✅ Consistent color scheme (#0066CC primary)
- ✅ Smooth animations with Framer Motion
- ✅ Responsive design for all devices
- ✅ Skeleton loading states
- ✅ Professional error handling
- ✅ Accessible components

## 📝 Recent Updates

### July 4, 2025 - About Page Dynamic Integration
- Implemented complete API integration for About page
- Added comprehensive error handling and loading states
- Created unit tests with 95%+ coverage
- Enhanced UI with statistics and partner displays
- Added fallback content for API failures
- Improved accessibility and responsive design

### Previous Updates
- Team page dynamic API integration
- Professional table layout implementation
- Search functionality with debouncing
- Comprehensive testing suite
- Error boundary implementation

## 🔒 Security Features

- Input sanitization for all user inputs
- XSS protection for dynamic content
- Secure API communication
- Environment-based configuration
- Error message sanitization

## 🚀 Deployment

### Build Process
```bash
npm run build
```

### Environment Variables
```env
VITE_API_BASE_URL=https://api.your-domain.com/api
NODE_ENV=production
```

### Production Considerations
- API endpoints must support CORS
- HTTPS required for production
- Static file serving configured
- Performance optimizations enabled

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and patterns
- Add unit tests for new features
- Update documentation for API changes
- Follow the Copilot rules defined in `copilot-rules.md`
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- University of Dodoma for project support
- Ministry of Education, Science and Technology
- All contributing team members and stakeholders

## 📞 Support

For support and questions:
- **Email**: nyahongo.jw@gmail.com
- **GitHub**: [@dawillygene](https://github.com/dawillygene)
- **Project Repository**: [STEM-PROJECT-FRONT_END](https://github.com/dawillygene/STEM-PROJECT-FRONT_END)

---

**Built with ❤️ by Elia William Mariki (@dawillygene)**
