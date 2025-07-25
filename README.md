# Fishta Mobile App

A React Native Expo mobile application for fish pond monitoring and management. Built with modern technologies and professional UI/UX design.

## 🐟 Overview

Fishta is a comprehensive mobile application designed for monitoring and managing fish ponds. The app provides real-time data visualization, alert management, and pond status tracking with a professional interface.

## ✨ Features

### 📊 Dashboard
- **Real-time Statistics**: Display pond count, region count, and sensor data
- **Dynamic Charts**: pH, temperature, and dissolved oxygen levels over time
- **Professional UI**: Clean, modern design with Fishta branding (#FB3026)
- **Value Scales**: Left-side scales for better chart readability
- **Current Day Highlighting**: Sunday highlighted as the current day

### 🏊‍♂️ Ponds Management
- **Pond List**: Professional table layout showing all ponds
- **Pond Details**: Name, location, and size information
- **Size Indicators**: Color-coded badges (Large: Green, Medium: Orange, Small: Red)
- **Real-time Data**: Fetches actual pond data from backend API

### 🚨 Alerts System
- **Alert Monitoring**: Real-time alert notifications
- **Level Classification**: Warning, Danger, and Info levels
- **Time Stamping**: Formatted creation times
- **Visual Indicators**: Color-coded icons and badges
- **Professional Cards**: Clean alert card layout

### 🔐 Authentication
- **Login System**: Email/password authentication
- **Token Management**: Secure token storage with AsyncStorage
- **API Integration**: Backend authentication with fallback
- **Error Handling**: Comprehensive error management

## 🛠 Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **HTTP Client**: Axios with interceptors
- **Storage**: AsyncStorage for token management
- **Icons**: Expo Vector Icons (Ionicons)
- **Styling**: React Native StyleSheet
- **State Management**: React Hooks (useState, useEffect)

## 📱 Screens

### 1. Welcome Screen (`welcome.tsx`)
- Fishta branding and theme
- Video background integration
- Swipe to login functionality
- Professional welcome interface

### 2. Login Screen (`login.tsx`)
- Email/password input fields
- Secure password visibility toggle
- Loading states and error handling
- Backend authentication integration

### 3. Dashboard Screen (`dashboard.tsx`)
- Overview cards with statistics
- Dynamic sensor data charts
- Bottom navigation bar
- Real-time data fetching

### 4. Ponds Screen (`ponds.tsx`)
- Professional table layout
- Pond information display
- Size-based color coding
- API integration for real data

### 5. Alerts Screen (`alerts.jsx`)
- Alert card layout
- Level-based color coding
- Time formatting
- Real-time alert monitoring

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio / Xcode (for mobile development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd junction-frontend/mob
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on device/simulator**
   ```bash
   # For Android
   npm run android
   
   # For iOS
   npm run ios
   
   # For web
   npm run web
   ```

## 🔌 API Integration

### Base Configuration
The app uses a centralized API configuration in `utils/api.js`:
- Base URL configuration
- Token management with AsyncStorage
- Request/response interceptors
- Error handling

### Services

#### Authentication Service (`services/authServices.js`)
```javascript
// Login functionality
authServices.login(email, password)

// Logout functionality
authServices.logout()

// Token management
authServices.getToken()
```

#### Statistics Service (`services/statServices.js`)
```javascript
// Fetch dashboard statistics
statServices.getStat()
```

#### Ponds Service (`services/pondsServices.js`)
```javascript
// Fetch ponds data
pondsServices.getPonds()
```

#### Alerts Service (`services/alertsServices.js`)
```javascript
// Fetch alerts data
alertsServices.getAlerts()
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/login` | POST | User authentication |
| `/stats` | GET | Dashboard statistics |
| `/ponds` | GET | Ponds list |
| `/alerts` | GET | Alerts list |

## 🎨 Design System

### Color Palette
- **Primary**: #FB3026 (Fishta Red)
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Orange)
- **Danger**: #EF4444 (Red)
- **Info**: #3B82F6 (Blue)
- **Text Primary**: #1A1A1A
- **Text Secondary**: #666
- **Background**: #F8F9FA
- **Card Background**: #FFF

### Typography
- **Headers**: 24px, Bold
- **Section Titles**: 18px, Bold
- **Body Text**: 14px, Regular
- **Small Text**: 12px, Regular

### Components
- **Cards**: Rounded corners, shadows, borders
- **Buttons**: Primary color, hover states
- **Badges**: Color-coded, rounded
- **Navigation**: Bottom tab bar with icons

## 📁 Project Structure

```
mob/
├── app/
│   └── (tabs)/
│       ├── _layout.tsx          # Navigation layout
│       ├── welcome.tsx          # Welcome screen
│       ├── login.tsx            # Login screen
│       ├── dashboard.tsx        # Dashboard screen
│       ├── ponds.tsx            # Ponds screen
│       └── alerts.jsx           # Alerts screen
├── services/
│   ├── authServices.js          # Authentication service
│   ├── statServices.js          # Statistics service
│   ├── pondsServices.js         # Ponds service
│   └── alertsServices.js        # Alerts service
├── utils/
│   └── api.js                   # API configuration
├── assets/
│   └── images/                  # App images and icons
└── components/                  # Reusable components
```

## 🚀 Development

### Adding New Features
1. Create service file in `services/`
2. Add screen in `app/(tabs)/`
3. Update navigation in `_layout.tsx`
4. Add navigation buttons to existing screens

### Code Style
- Use functional components with hooks
- Follow React Native best practices
- Implement proper error handling
- Add loading states for API calls
- Use consistent naming conventions

## 🔒 Security

- **Token Storage**: Secure AsyncStorage implementation
- **API Security**: Request interceptors for authentication
- **Error Handling**: Comprehensive error management
- **Data Validation**: Input validation and sanitization

## 📊 Performance

- **Optimized Images**: Proper image sizing and formats
- **Efficient Navigation**: Expo Router for smooth transitions
- **Memory Management**: Proper cleanup in useEffect
- **API Caching**: Efficient data fetching strategies

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo start --clear
   ```

2. **API connection problems**
   - Check network connectivity
   - Verify API base URL in `utils/api.js`
   - Ensure backend server is running

3. **Navigation errors**
   - Clear app cache
   - Restart development server

## 📝 License

This project is proprietary software developed for Fishta fish pond monitoring system.

## 👥 Contributing

1. Follow the established code style
2. Add proper error handling
3. Test on both Android and iOS
4. Update documentation for new features

## 📞 Support

For technical support or feature requests, please contact the development team.

---

**Fishta Mobile App** - Professional fish pond monitoring solution
