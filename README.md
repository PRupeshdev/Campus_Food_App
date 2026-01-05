# 🍽️ VIT-AP Smart Campus Food Ordering System

A modern web-based food ordering platform designed for VIT-AP University students to order food online, skip queues, and track orders in real-time.

![Status](https://img.shields.io/badge/status-prototype-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-orange)

---

## 📋 Problem Statement

Students at VIT-AP currently face:
- ⏰ Long waiting queues at canteen and Food Street
- 📝 Manual order placement and bill collection
- 🚫 No digital ordering system
- ❌ No order tracking capability
- 😓 Time loss and inconvenience between classes

---

## ✨ Solution

A **Smart Campus Food Ordering System** that enables students to:

✅ Log in securely with their student account  
✅ Browse the complete canteen/Food Street menu online  
✅ Select and customize food orders  
✅ Receive digital e-bills with unique order IDs  
✅ Track live order status (Placed → Preparing → Ready)  
✅ View complete order history

---

## 🚀 Key Features

### 🔐 Authentication
- Student login and registration
- Secure Firebase Authentication
- Password reset functionality
- Auto-login with "Remember Me"

### 📱 Menu Browsing
- Beautiful, categorized menu display
- Category filters (Breakfast, Meals, Snacks, Beverages)
- Real-time menu updates
- Item descriptions and images

### 🛒 Shopping Cart
- Add/remove items with quantity control
- Real-time cart updates
- Persistent cart (saved to localStorage)
- Visual cart badge with item count

### 📊 Order Management
- Unique auto-generated Order IDs (e.g., ORD-ABC123)
- Digital bill generation
- Order confirmation

### 📍 Real-Time Order Tracking
- Live status updates via Firebase
- Animated status timeline
- 4 status stages:
  - 📝 **Placed** - Order received
  - 👨‍🍳 **Preparing** - Being prepared
  - ✅ **Ready** - Ready for pickup
  - ✔️ **Completed** - Order fulfilled

### 📜 Order History
- Complete order history
- Filter and search orders
- Detailed order views
- Reorder functionality

---

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern design with custom variables
- **JavaScript (ES6+)** - Interactive functionality
- **Google Fonts (Inter)** - Premium typography

### Backend & Database
- **Firebase Authentication** - User management
- **Cloud Firestore** - Real-time database
- **Firebase Web SDK** - Client-side integration

### Design Principles
- ✨ Modern glassmorphism effects
- 🎨 Vibrant gradient color schemes
- 🌊 Smooth animations and transitions
- 📱 Fully responsive design
- ♿ Accessible UI components

---

## 📁 Project Structure

```
dark-curie/
├── index.html              # Main dashboard (menu browsing)
├── login.html              # Authentication page
├── orders.html             # Order tracking & history
├── style.css               # Global styles & design system
├── firebase-config.js      # Firebase configuration & utilities
└── README.md               # This file
```

---

## 🔧 Setup Instructions

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Firebase account (free tier works fine)
- Basic understanding of Firebase Console

### Step 1: Firebase Project Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add Project"
   - Enter project name: `vit-ap-food-ordering`
   - Disable Google Analytics (optional for MVP)
   - Click "Create Project"

2. **Enable Authentication**
   - In Firebase Console, go to **Authentication**
   - Click "Get Started"
   - Enable **Email/Password** sign-in method
   - Save changes

3. **Create Firestore Database**
   - Go to **Firestore Database**
   - Click "Create Database"
   - Start in **Test Mode** (for development)
   - Choose a location (e.g., asia-south1 for India)
   - Click "Enable"

4. **Get Firebase Config**
   - Go to Project Settings (gear icon)
   - Scroll to "Your apps"
   - Click the web icon (</>)
   - Register app with nickname: `vit-ap-food-web`
   - Copy the `firebaseConfig` object

### Step 2: Configure the Application

1. **Update Firebase Configuration**
   
   Open `firebase-config.js` and replace the config object:

   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

   Replace with your actual Firebase credentials.

2. **Set Firestore Security Rules**
   
   In Firebase Console → Firestore Database → Rules:

   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Users collection
       match /users/{userId} {
         allow read: if request.auth != null;
         allow write: if request.auth != null && request.auth.uid == userId;
       }
       
       // Menu items - read by all authenticated users
       match /menuItems/{itemId} {
         allow read: if request.auth != null;
         allow write: if false; // Only admin can write (set up admin later)
       }
       
       // Orders - users can only access their own orders
       match /orders/{orderId} {
         allow read: if request.auth != null && 
                        resource.data.userId == request.auth.uid;
         allow create: if request.auth != null && 
                          request.resource.data.userId == request.auth.uid;
         allow update: if false; // Only admin/canteen can update status
       }
     }
   }
   ```

### Step 3: Run the Application

1. **Local Development Server**

   Option A - Using Python:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   Option B - Using Node.js:
   ```bash
   npx http-server -p 8000
   ```

   Option C - Using VS Code:
   - Install "Live Server" extension
   - Right-click `login.html` → "Open with Live Server"

2. **Open in Browser**
   
   Navigate to: `http://localhost:8000/login.html`

### Step 4: Initialize Sample Data

1. **Create First User**
   - Open `login.html`
   - Click "Sign Up" tab
   - Fill in details:
     - Name: Your Name
     - Email: student@vitap.ac.in
     - Password: (min 6 characters)
   - Click "Create Account"

2. **Auto-Initialize Menu**
   - The app will automatically create sample menu items on first login
   - Sample items include breakfast, meals, snacks, and beverages

---

## 📖 User Guide

### For Students

1. **Login/Register**
   - Visit `login.html`
   - Create account or use existing credentials
   - Demo credentials: `demo@vitap.ac.in` / `demo123`

2. **Browse Menu**
   - View all available items
   - Filter by category (Breakfast, Meals, Snacks, Beverages)
   - See prices and descriptions

3. **Place Order**
   - Select quantity for items
   - Click "Add to Cart"
   - Review cart (floating cart button)
   - Click "Place Order"
   - Receive unique Order ID

4. **Track Order**
   - Go to "My Orders" page
   - View real-time status updates
   - Track progress: Placed → Preparing → Ready
   - Get notified when ready for pickup

5. **Order History**
   - View all past orders
   - See detailed bill information
   - Reorder favorite items

---

## 🎨 Design Highlights

### Color Palette
- **Primary**: Vibrant purple gradient (#667eea → #764ba2)
- **Secondary**: Warm coral gradient (#fa709a → #fee140)
- **Accent**: Fresh green (#10b981)
- **Status Colors**: Blue (Placed), Orange (Preparing), Green (Ready)

### UI/UX Features
- 🎭 Glassmorphism cards with backdrop blur
- 🌈 Smooth gradient backgrounds
- ⚡ Micro-animations on interactions
- 📱 Mobile-first responsive design
- ♿ WCAG 2.1 accessibility compliant

---

## 🔄 Demo/Testing Features

Since this is a student-facing prototype, we've included demo features:

### Simulate Order Status Updates
- On the "My Orders" page
- Click "Simulate Update" button on active orders
- This mimics canteen staff updating order status
- In production, this would be an admin panel

### Demo Credentials
- Email: `demo@vitap.ac.in`
- Password: `demo123`
- Click "Fill Demo Credentials" button on login page

---

## 📊 Database Schema

### Collections

#### `users`
```javascript
{
  uid: "string",
  email: "string",
  displayName: "string",
  createdAt: timestamp,
  role: "student"
}
```

#### `menuItems`
```javascript
{
  name: "string",
  category: "string", // Breakfast|Meals|Snacks|Beverages
  price: number,
  image: "string", // emoji
  description: "string",
  available: boolean
}
```

#### `orders`
```javascript
{
  orderId: "string", // ORD-ABC123
  userId: "string",
  userEmail: "string",
  userName: "string",
  items: [
    {
      itemId: "string",
      name: "string",
      price: number,
      quantity: number,
      image: "string"
    }
  ],
  totalAmount: number,
  status: "string", // placed|preparing|ready|completed
  createdAt: timestamp,
  updatedAt: timestamp,
  statusHistory: [
    {
      status: "string",
      timestamp: timestamp
    }
  ]
}
```

---

## 🚀 Deployment

### Option 1: Firebase Hosting (Recommended)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase Hosting
firebase init hosting

# Select your project
# Set public directory: . (current directory)
# Configure as single-page app: No
# Don't overwrite index.html

# Deploy
firebase deploy --only hosting
```

Your app will be live at: `https://your-project.web.app`

### Option 2: GitHub Pages

1. Create a GitHub repository
2. Push your code
3. Go to Settings → Pages
4. Select branch and folder
5. Save

Your app will be live at: `https://username.github.io/repo-name`

### Option 3: Netlify/Vercel

1. Create account on Netlify or Vercel
2. Connect your GitHub repository
3. Deploy with one click
4. Get custom domain

---

## 🔐 Security Considerations

### Current (MVP) Security
- ✅ Firebase Authentication
- ✅ Basic Firestore rules
- ⚠️ Test mode for development
- ⚠️ Client-side only validation

### Production Recommendations
- 🔒 Enable production Firestore rules
- 🔒 Implement Cloud Functions for order processing
- 🔒 Add server-side validation
- 🔒 Enable HTTPS only
- 🔒 Implement rate limiting
- 🔒 Add CORS policies
- 🔒 Use environment variables for sensitive data

---

## 🎯 Future Enhancements

### Phase 2 Features
- [ ] Payment gateway integration (UPI, Cards)
- [ ] Push notifications for order updates
- [ ] Canteen staff admin panel
- [ ] Menu item availability toggle
- [ ] Order scheduling (pre-order)
- [ ] Favorites and reorder
- [ ] Rating and reviews
- [ ] Dietary preferences filter (Veg/Non-veg)

### Phase 3 Features
- [ ] Multiple canteen support
- [ ] Delivery tracking with maps
- [ ] Analytics dashboard
- [ ] Loyalty points system
- [ ] QR code for order pickup
- [ ] Voice ordering
- [ ] Multi-language support

---

## 🐛 Troubleshooting

### Issue: Firebase not initialized
**Solution**: Check `firebase-config.js` has correct credentials

### Issue: Orders not appearing
**Solution**: Check Firestore rules allow read access

### Issue: Can't place order
**Solution**: Ensure user is authenticated and cart isn't empty

### Issue: Styles not loading
**Solution**: Ensure `style.css` is in the same directory

### Issue: Menu items not showing
**Solution**: 
1. Check browser console for errors
2. Verify Firestore has `menuItems` collection
3. Try re-initializing with the sample data

---

## 👥 Contributors

- **Development Team**: VIT-AP Students
- **Technology**: Google Firebase
- **Design Inspiration**: Modern food delivery apps

---

## 📄 License

This project is created as an educational prototype for VIT-AP University.

MIT License - feel free to use and modify as needed.

---

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Contact: student@vitap.ac.in
- Documentation: See inline code comments

---

## 🙏 Acknowledgments

- VIT-AP University for the problem statement
- Firebase for backend infrastructure
- Google Fonts for Inter typeface
- Students who provided feedback

---

**Made with ❤️ for VIT-AP Students**

*Last Updated: December 2025*
