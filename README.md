# 🚀 Shourya Gupta - Software Engineer Portfolio

A modern, interactive portfolio website showcasing my skills, projects, and experience as a Software Engineer. Built with React, TypeScript, and cutting-edge web technologies.

![Portfolio Preview](https://via.placeholder.com/800x400/0a0a0a/00ff88?text=Shourya+Gupta+Portfolio)

**🌐 Live Demo**: [https://portfolio-1ff73u980-shouryaskg-gmailcoms-projects.vercel.app](https://portfolio-1ff73u980-shouryaskg-gmailcoms-projects.vercel.app)

## ✨ Features

### 🎯 **Interactive Experience**
- **Dual-Mode Interface**: Switch between modern GUI and retro CLI modes
- **3D Animations**: Immersive Three.js background with particle systems
- **Mouse Trail Effects**: Beautiful animated trails following cursor movement
- **Smooth Transitions**: 60fps animations powered by Framer Motion

### 🎨 **Modern Design**
- **Glassmorphism UI**: Modern glass-like effects with backdrop blur
- **Cyberpunk Theme**: Green (#00ff88) and blue (#0099ff) color scheme
- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark Mode**: Eye-friendly dark theme with accent colors

### 📱 **Complete Portfolio Sections**
- **Hero Section**: Dynamic typing animation with social links
- **About**: Skills visualization with progress bars and statistics
- **GitHub Contributions**: Live GitHub activity visualization
- **Technical Expertise**: Detailed skills breakdown with icons
- **Projects**: Interactive project showcase with filtering
- **Experience**: Timeline-based work history
- **Contact**: Fully functional contact form with EmailJS integration

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with strict mode
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### **3D & Animations**
- **Three.js** - 3D graphics and animations
- **React Three Fiber** - React renderer for Three.js
- **Framer Motion** - Production-ready motion library

### **Email Integration**
- **EmailJS** - Client-side email service
- **Nodemailer** - Server-side email handling (fallback)

### **Development Tools**
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking
- **Git** - Version control

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shourya13x/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in the root directory
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

### Building for Production

```bash
npm run build
npm run preview
```

## 🎮 Interactive Features

### CLI Mode Commands

Switch to CLI mode and try these interactive commands:

| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `about` | Personal information and bio |
| `skills` | Technical skills breakdown |
| `projects` | Portfolio projects listing |
| `experience` | Work history timeline |
| `contact` | Contact information |
| `github` | GitHub contributions and stats |
| `resume` | Download resume |
| `clear` | Clear terminal |

### Interactive Elements

- **Mouse Trail Effects**: Beautiful animated trails following cursor movement
- **3D Background**: Floating geometric shapes and particle systems
- **Rotating Wheels**: Animated tech-themed background elements
- **Falling Binary**: Matrix-style falling code animation
- **Smooth Animations**: 60fps animations throughout the interface

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero/              # Landing section with typing animation
│   ├── About/             # About section with skills
│   ├── GitHubContributions/ # GitHub activity visualization
│   ├── TechnicalExpertise/  # Skills breakdown
│   ├── Projects/          # Project showcase with filtering
│   ├── Experience/        # Work timeline
│   ├── Contact/           # Contact form with EmailJS
│   ├── Navigation/        # Header navigation
│   ├── CLI/               # Terminal interface
│   ├── MouseTrail/        # Mouse trail effects
│   ├── FallingBinary/     # Matrix-style animation
│   ├── RotatingWheel/     # 3D rotating elements
│   └── SplineRobot/       # 3D robot model
├── hooks/                 # Custom React hooks
├── services/              # Email service and API calls
├── utils/                 # Utility functions
├── types/                 # TypeScript definitions
└── assets/                # Static assets and images
```

## 🎨 Customization

### Personal Information

Update your personal details in the following files:

- **Hero Section**: `src/components/Hero/Hero.tsx`
- **About Section**: `src/components/About/About.tsx`
- **Projects**: `src/components/Projects/Projects.tsx`
- **Experience**: `src/components/Experience/Experience.tsx`
- **Contact Info**: `src/components/Contact/Contact.tsx`

### Styling

- **Colors**: Modify `tailwind.config.js` color palette
- **Animations**: Adjust Framer Motion configurations in components
- **3D Elements**: Customize background in Three.js components

### Email Configuration

The contact form uses EmailJS for reliable email delivery:

1. **Create EmailJS Account**: [https://www.emailjs.com/](https://www.emailjs.com/)
2. **Set up Email Service**: Connect your Gmail or other email provider
3. **Create Email Template**: Use the template provided in `EMAIL_SETUP.md`
4. **Add Environment Variables**: Update `.env` file with your credentials

## 📱 Responsive Design

- **Mobile**: Optimized for touch devices with simplified 3D elements
- **Tablet**: Medium screen optimizations with balanced features
- **Desktop**: Full 3D experience with all interactive elements
- **Large Screens**: Enhanced spacing and layouts

## ⚡ Performance Optimizations

- **Code Splitting**: Lazy loading of components
- **Bundle Optimization**: Efficient code bundling with Vite
- **60fps Animations**: Smooth performance on all devices
- **Memory Management**: Proper cleanup of 3D resources
- **Mobile Optimization**: 3D elements disabled on mobile for performance

## 📧 Contact Form

The contact form is fully functional with multiple delivery methods:

### ✅ **Primary: EmailJS**
- Send emails directly from the frontend
- No backend server required
- Professional email templates
- Reliable delivery

### ✅ **Fallback: Direct Email**
- Mailto links when EmailJS fails
- Ensures users can always reach you
- Opens user's default email client

## 🚀 Deployment

### Vercel (Current)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

- **Email**: shouryaofficial1303@gmail.com
- **LinkedIn**: [https://linkedin.com/in/shouryagupta13](https://linkedin.com/in/shouryagupta13)
- **GitHub**: [https://github.com/shourya13x](https://github.com/shourya13x)
- **Portfolio**: [https://portfolio-1ff73u980-shouryaskg-gmailcoms-projects.vercel.app](https://portfolio-1ff73u980-shouryaskg-gmailcoms-projects.vercel.app)

## 🎯 Future Enhancements

- [ ] Voice interaction features
- [ ] Multiple theme personalities
- [ ] Blog integration
- [ ] Real-time visitor analytics
- [ ] VR/AR experience mode
- [ ] Multi-language support
- [ ] PWA capabilities

---

**Built with ❤️ by Shourya Gupta**

*This portfolio showcases advanced web development skills including 3D graphics, complex animations, and interactive user experiences. Feel free to use this as inspiration for your own portfolio!*