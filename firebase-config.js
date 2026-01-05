

const firebaseConfig = {
    apiKey: "AIzaSyC2bY73DuYuixTwnKKYqhvRupTAdZ3F4xQ",
    authDomain: "smartcampusfoodorder.firebaseapp.com",
    projectId: "smartcampusfoodorder",
    storageBucket: "smartcampusfoodorder.firebasestorage.app",
    messagingSenderId: "193431089084",
    appId: "1:193431089084:web:d23ddc5c794a099be805b9"
};

// Check if Firebase is configured
const isFirebaseConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY" &&
    firebaseConfig.apiKey.length > 10;

// Demo mode flag
let DEMO_MODE = !isFirebaseConfigured;

// Initialize Firebase
let app, auth, db;

if (isFirebaseConfigured) {
    try {
        app = firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();
        console.log('✅ Firebase initialized successfully');
        DEMO_MODE = false;
    } catch (error) {
        console.error('❌ Firebase initialization error:', error);
        console.warn('🔧 Falling back to DEMO MODE (localStorage)');
        DEMO_MODE = true;
    }
} else {
    console.warn('⚠️ Firebase not configured - Running in DEMO MODE');
    console.info('📚 See setup.html or open browser console for setup instructions');
    console.info('🔗 Firebase Console: https://console.firebase.google.com/');
    DEMO_MODE = true;
}

// ========================================
// DEMO MODE HELPERS (LocalStorage)
// ========================================

function getDemoUsers() {
    const users = localStorage.getItem('demo_users');
    return users ? JSON.parse(users) : [];
}

function saveDemoUsers(users) {
    localStorage.setItem('demo_users', JSON.stringify(users));
}

function getDemoCurrentUser() {
    const user = localStorage.getItem('demo_current_user');
    return user ? JSON.parse(user) : null;
}

function saveDemoCurrentUser(user) {
    if (user) {
        localStorage.setItem('demo_current_user', JSON.stringify(user));
    } else {
        localStorage.removeItem('demo_current_user');
    }
}

// ========================================
// AUTHENTICATION FUNCTIONS
// ========================================

/**
 * Register a new user with email and password
 */
async function registerUser(email, password, displayName) {
    if (DEMO_MODE) {
        // Demo mode - use localStorage
        try {
            const users = getDemoUsers();

            // Check if user already exists
            if (users.find(u => u.email === email)) {
                return { success: false, error: 'Email already in use' };
            }

            const newUser = {
                uid: 'demo_' + Date.now(),
                email: email,
                displayName: displayName,
                createdAt: new Date().toISOString()
            };

            users.push(newUser);
            saveDemoUsers(users);
            saveDemoCurrentUser(newUser);

            console.log('✅ Demo user registered:', newUser.uid);
            return { success: true, user: newUser };
        } catch (error) {
            console.error('❌ Demo registration error:', error);
            return { success: false, error: error.message };
        }
    }

    // Firebase mode
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Update user profile with display name
        await user.updateProfile({
            displayName: displayName
        });

        // Create user document in Firestore
        await db.collection('users').doc(user.uid).set({
            uid: user.uid,
            email: email,
            displayName: displayName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            role: 'student'
        });

        console.log('✅ User registered successfully:', user.uid);
        return { success: true, user };
    } catch (error) {
        console.error('❌ Registration error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Sign in existing user
 */
async function signInUser(email, password) {
    if (DEMO_MODE) {
        // Demo mode - use localStorage
        try {
            const users = getDemoUsers();
            const user = users.find(u => u.email === email);

            if (!user) {
                return { success: false, error: 'User not found. Please sign up first.' };
            }

            saveDemoCurrentUser(user);
            console.log('✅ Demo user signed in:', user.uid);
            return { success: true, user };
        } catch (error) {
            console.error('❌ Demo sign in error:', error);
            return { success: false, error: error.message };
        }
    }

    // Firebase mode
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        console.log('✅ User signed in successfully:', userCredential.user.uid);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('❌ Sign in error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Sign out current user
 */
async function signOutUser() {
    if (DEMO_MODE) {
        saveDemoCurrentUser(null);
        console.log('✅ Demo user signed out');
        return { success: true };
    }

    try {
        await auth.signOut();
        console.log('✅ User signed out successfully');
        return { success: true };
    } catch (error) {
        console.error('❌ Sign out error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get current authenticated user
 */
function getCurrentUser() {
    if (DEMO_MODE) {
        return getDemoCurrentUser();
    }
    return auth.currentUser;
}

/**
 * Check authentication state and redirect if needed
 */
function checkAuthState(requireAuth = true) {
    return new Promise((resolve) => {
        if (DEMO_MODE) {
            const user = getDemoCurrentUser();
            if (requireAuth && !user) {
                window.location.href = 'login.html';
            } else if (!requireAuth && user) {
                window.location.href = 'index.html';
            }
            resolve(user);
        } else {
            auth.onAuthStateChanged((user) => {
                if (requireAuth && !user) {
                    window.location.href = 'login.html';
                } else if (!requireAuth && user) {
                    window.location.href = 'index.html';
                }
                resolve(user);
            });
        }
    });
}

// ========================================
// MENU FUNCTIONS
// ========================================

/**
 * Get all menu items from Firestore
 */
async function getMenuItems() {
    try {
        // Simplify query to avoid need for composite indexes
        const snapshot = await db.collection('menuItems').get();

        let items = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            // Include all items, even if unavailable
            items.push({ id: doc.id, ...data });
        });

        // Sort client-side
        items.sort((a, b) => {
            // 1. Availability: Available items first
            if (a.available !== b.available) {
                return a.available ? -1 : 1;
            }
            // 2. Category
            if (a.category !== b.category) {
                return a.category.localeCompare(b.category);
            }
            // 3. Name
            return a.name.localeCompare(b.name);
        });

        console.log(`✅ Fetched ${items.length} menu items`);
        return items;
    } catch (error) {
        console.error('❌ Error fetching menu items:', error);
        return [];
    }
}

/**
 * Initialize sample menu items (for demo purposes)
 */
async function initializeSampleMenu() {
    try {
        // First check if items already exist to prevent duplicates
        const snapshot = await db.collection('menuItems').limit(1).get();
        if (!snapshot.empty) {
            console.log('ℹ️ Menu items already exist, skipping initialization');
            return;
        }

        const sampleItems = [
            // Breakfast
            { name: 'Masala Dosa', category: 'Breakfast', price: 45, image: '🥞', available: true, description: 'Crispy dosa with potato masala' },
            { name: 'Idli Sambar', category: 'Breakfast', price: 35, image: '🍚', available: true, description: 'Soft idlis with sambar & chutney' },
            { name: 'Poha', category: 'Breakfast', price: 30, image: '🍛', available: true, description: 'Flattened rice with spices' },
            { name: 'Upma', category: 'Breakfast', price: 30, image: '🥣', available: true, description: 'Semolina with vegetables' },

            // Lunch/Dinner
            { name: 'Veg Thali', category: 'Meals', price: 80, image: '🍱', available: true, description: 'Complete veg meal with rice, roti, dal & sabzi' },
            { name: 'Chicken Biryani', category: 'Meals', price: 120, image: '🍗', available: true, description: 'Aromatic biryani with tender chicken' },
            { name: 'Paneer Butter Masala', category: 'Meals', price: 90, image: '🧈', available: true, description: 'Paneer in rich creamy gravy' },
            { name: 'Dal Tadka', category: 'Meals', price: 60, image: '🫘', available: true, description: 'Yellow lentils with tadka' },

            // Snacks
            { name: 'Samosa', category: 'Snacks', price: 15, image: '🥟', available: true, description: 'Crispy fried pastry with filling' },
            { name: 'Vada Pav', category: 'Snacks', price: 20, image: '🍔', available: true, description: 'Mumbai street food special' },
            { name: 'Pani Puri', category: 'Snacks', price: 25, image: '🎯', available: true, description: '6 pieces of crispy puri' },
            { name: 'French Fries', category: 'Snacks', price: 40, image: '🍟', available: true, description: 'Crispy golden fries' },

            // Beverages
            { name: 'Chai', category: 'Beverages', price: 10, image: '☕', available: true, description: 'Hot Indian tea' },
            { name: 'Coffee', category: 'Beverages', price: 15, image: '☕', available: true, description: 'Fresh brewed coffee' },
            { name: 'Cold Coffee', category: 'Beverages', price: 30, image: '🥤', available: true, description: 'Iced coffee with cream' },
            { name: 'Mango Lassi', category: 'Beverages', price: 35, image: '🥭', available: true, description: 'Sweet yogurt drink' },
        ];

        const batch = db.batch();
        sampleItems.forEach(item => {
            const docRef = db.collection('menuItems').doc();
            batch.set(docRef, item);
        });
        await batch.commit();
        console.log('✅ Sample menu initialized');
    } catch (error) {
        console.error('❌ Error initializing menu:', error);
    }
}

/**
 * Initialize shop-based menu items from shop-menu-data.js
 */
async function initializeShopMenu() {
    try {
        console.log('🔄 Initializing shop-based menu...');

        // Check if SHOP_MENU_DATA is available
        if (typeof SHOP_MENU_DATA === 'undefined') {
            console.error('❌ SHOP_MENU_DATA not found. Make sure shop-menu-data.js is loaded.');
            return;
        }

        // Clear existing menu items first
        const existingSnapshot = await db.collection('menuItems').get();
        if (!existingSnapshot.empty) {
            console.log(`🗑️ Clearing ${existingSnapshot.size} existing menu items...`);
            const deleteBatch = db.batch();
            existingSnapshot.docs.forEach(doc => {
                deleteBatch.delete(doc.ref);
            });
            await deleteBatch.commit();
            console.log('✅ Existing items cleared');
        }

        // Add new shop-based items in batches (Firestore limit is 500 per batch)
        console.log(`➕ Adding ${SHOP_MENU_DATA.length} shop-based items...`);

        const batchSize = 500;
        for (let i = 0; i < SHOP_MENU_DATA.length; i += batchSize) {
            const batch = db.batch();
            const chunk = SHOP_MENU_DATA.slice(i, i + batchSize);

            chunk.forEach(item => {
                const docRef = db.collection('menuItems').doc();
                batch.set(docRef, item);
            });

            await batch.commit();
        }

        console.log('✅ Shop-based menu initialized successfully');
        console.log(`📊 Total items: ${SHOP_MENU_DATA.length}`);
        console.log('🏪 Shops: Bits and Bites (Veg), Bits and Bites (Non-Veg), Zu zu Zones, Oasis, Puri Vuri');
    } catch (error) {
        console.error('❌ Error initializing shop menu:', error);
    }
}

// ========================================
// ORDER FUNCTIONS
// ========================================

/**
 * Generate unique order ID
 */
function generateOrderId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
    return `ORD-${timestamp}-${random}`.toUpperCase();
}

/**
 * Place a new order
 */
async function placeOrder(items, totalAmount) {
    try {
        const user = getCurrentUser();
        if (!user) {
            throw new Error('User not authenticated');
        }

        const orderId = generateOrderId();
        const orderData = {
            orderId: orderId,
            userId: user.uid,
            userEmail: user.email,
            userName: user.displayName || 'Student',
            items: items,
            totalAmount: totalAmount,
            status: 'placed',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            statusHistory: [
                {
                    status: 'placed',
                    timestamp: new Date().toISOString()
                }
            ]
        };

        await db.collection('orders').doc(orderId).set(orderData);
        console.log('✅ Order placed successfully:', orderId);
        return { success: true, orderId, orderData };
    } catch (error) {
        console.error('❌ Error placing order:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get user's orders
 */
async function getUserOrders(userId) {
    try {
        const snapshot = await db.collection('orders')
            .where('userId', '==', userId)
            .get();

        const orders = [];
        snapshot.forEach(doc => {
            orders.push({ id: doc.id, ...doc.data() });
        });

        // Client-side sort to avoid needing composite index
        orders.sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
            return dateB - dateA;
        });

        console.log(`✅ Fetched ${orders.length} orders for user`);
        return orders;
    } catch (error) {
        console.error('❌ Error fetching orders:', error);
        return [];
    }
}

/**
 * Get specific order by ID
 */
async function getOrderById(orderId) {
    try {
        const doc = await db.collection('orders').doc(orderId).get();
        if (doc.exists) {
            return { id: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error('❌ Error fetching order:', error);
        return null;
    }
}

/**
 * Listen to order status changes in real-time
 */
function listenToOrderStatus(orderId, callback) {
    return db.collection('orders').doc(orderId)
        .onSnapshot((doc) => {
            if (doc.exists) {
                callback({ id: doc.id, ...doc.data() });
            }
        }, (error) => {
            console.error('❌ Error listening to order:', error);
        });
}

/**
 * Update order status (for demo/admin purposes)
 */
async function updateOrderStatus(orderId, newStatus) {
    try {
        await db.collection('orders').doc(orderId).update({
            status: newStatus,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            statusHistory: firebase.firestore.FieldValue.arrayUnion({
                status: newStatus,
                timestamp: new Date().toISOString()
            })
        });
        console.log(`✅ Order ${orderId} status updated to ${newStatus}`);
        return { success: true };
    } catch (error) {
        console.error('❌ Error updating order status:', error);
        return { success: false, error: error.message };
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Format price in INR
 */
function formatPrice(amount) {
    return `₹${amount.toFixed(2)}`;
}

/**
 * Format timestamp
 */
function formatTimestamp(timestamp) {
    if (!timestamp) return 'N/A';

    let date;
    if (timestamp.toDate) {
        date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
        date = timestamp;
    } else {
        date = new Date(timestamp);
    }

    return date.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Get status badge class
 */
function getStatusBadgeClass(status) {
    const statusMap = {
        'placed': 'badge-info',
        'preparing': 'badge-warning',
        'ready': 'badge-success',
        'completed': 'badge-primary'
    };
    return statusMap[status] || 'badge-info';
}

/**
 * Get status display text
 */
function getStatusText(status) {
    const statusMap = {
        'placed': 'Order Placed',
        'preparing': 'Preparing',
        'ready': 'Ready for Pickup',
        'completed': 'Completed'
    };
    return statusMap[status] || status;
}
