
window._firebaseOriginals = window._firebaseOriginals || {};

// Store references to original functions if not already stored
if (!window._firebaseOriginals.getMenuItems) {
    window._firebaseOriginals.getMenuItems = getMenuItems;
    window._firebaseOriginals.initializeSampleMenu = initializeSampleMenu;
    window._firebaseOriginals.placeOrder = placeOrder;
    window._firebaseOriginals.getUserOrders = getUserOrders;
    window._firebaseOriginals.updateOrderStatus = updateOrderStatus;
    window._firebaseOriginals.listenToOrderStatus = listenToOrderStatus;
}

// Override getMenuItems for demo mode
getMenuItems = async function () {
    if (DEMO_MODE) {
        const items = localStorage.getItem('demo_menu');
        if (items) {
            const menuItems = JSON.parse(items);
            console.log(`✅ Fetched ${menuItems.length} demo menu items`);
            return menuItems;
        }
        return [];
    }
    return window._firebaseOriginals.getMenuItems();
};

// Override initializeSampleMenu for demo mode
initializeSampleMenu = async function () {
    if (DEMO_MODE) {
        const sampleItems = [
            // Breakfast
            { id: 'item_1', name: 'Masala Dosa', category: 'Breakfast', price: 45, image: '🥞', available: true, description: 'Crispy dosa with potato masala' },
            { id: 'item_2', name: 'Idli Sambar', category: 'Breakfast', price: 35, image: '🍚', available: true, description: 'Soft idlis with sambar & chutney' },
            { id: 'item_3', name: 'Poha', category: 'Breakfast', price: 30, image: '🍛', available: true, description: 'Flattened rice with spices' },
            { id: 'item_4', name: 'Upma', category: 'Breakfast', price: 30, image: '🥣', available: true, description: 'Semolina with vegetables' },

            // Lunch/Dinner
            { id: 'item_5', name: 'Veg Thali', category: 'Meals', price: 80, image: '🍱', available: true, description: 'Complete veg meal with rice, roti, dal & sabzi' },
            { id: 'item_6', name: 'Chicken Biryani', category: 'Meals', price: 120, image: '🍗', available: true, description: 'Aromatic biryani with tender chicken' },
            { id: 'item_7', name: 'Paneer Butter Masala', category: 'Meals', price: 90, image: '🧈', available: true, description: 'Paneer in rich creamy gravy' },
            { id: 'item_8', name: 'Dal Tadka', category: 'Meals', price: 60, image: '🫘', available: true, description: 'Yellow lentils with tadka' },

            // Snacks
            { id: 'item_9', name: 'Samosa', category: 'Snacks', price: 15, image: '🥟', available: true, description: 'Crispy fried pastry with filling' },
            { id: 'item_10', name: 'Vada Pav', category: 'Snacks', price: 20, image: '🍔', available: true, description: 'Mumbai street food special' },
            { id: 'item_11', name: 'Pani Puri', category: 'Snacks', price: 25, image: '🎯', available: true, description: '6 pieces of crispy puri' },
            { id: 'item_12', name: 'French Fries', category: 'Snacks', price: 40, image: '🍟', available: true, description: 'Crispy golden fries' },

            // Beverages
            { id: 'item_13', name: 'Chai', category: 'Beverages', price: 10, image: '☕', available: true, description: 'Hot Indian tea' },
            { id: 'item_14', name: 'Coffee', category: 'Beverages', price: 15, image: '☕', available: true, description: 'Fresh brewed coffee' },
            { id: 'item_15', name: 'Cold Coffee', category: 'Beverages', price: 30, image: '🥤', available: true, description: 'Iced coffee with cream' },
            { id: 'item_16', name: 'Mango Lassi', category: 'Beverages', price: 35, image: '🥭', available: true, description: 'Sweet yogurt drink' },
        ];

        localStorage.setItem('demo_menu', JSON.stringify(sampleItems));
        console.log('✅ Demo menu initialized with', sampleItems.length, 'items');
        return;
    }
    return window._firebaseOriginals.initializeSampleMenu();
};

// Override placeOrder for demo mode
placeOrder = async function (items, totalAmount) {
    if (DEMO_MODE) {
        const user = getCurrentUser();
        if (!user) {
            return { success: false, error: 'User not authenticated' };
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
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            statusHistory: [
                {
                    status: 'placed',
                    timestamp: new Date().toISOString()
                }
            ]
        };

        // Save to localStorage
        const orders = JSON.parse(localStorage.getItem('demo_orders') || '[]');
        orders.push(orderData);
        localStorage.setItem('demo_orders', JSON.stringify(orders));

        console.log('✅ Demo order placed:', orderId);
        return { success: true, orderId, orderData };
    }
    return window._firebaseOriginals.placeOrder(items, totalAmount);
};

// Override getUserOrders for demo mode
getUserOrders = async function (userId) {
    if (DEMO_MODE) {
        const orders = JSON.parse(localStorage.getItem('demo_orders') || '[]');
        const userOrders = orders.filter(o => o.userId === userId)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        console.log(`✅ Fetched ${userOrders.length} demo orders for user ${userId}`);
        return userOrders;
    }
    return window._firebaseOriginals.getUserOrders(userId);
};

// Override updateOrderStatus for demo mode
updateOrderStatus = async function (orderId, newStatus) {
    if (DEMO_MODE) {
        const orders = JSON.parse(localStorage.getItem('demo_orders') || '[]');
        const orderIndex = orders.findIndex(o => o.orderId === orderId);

        if (orderIndex > -1) {
            orders[orderIndex].status = newStatus;
            orders[orderIndex].updatedAt = new Date().toISOString();
            orders[orderIndex].statusHistory.push({
                status: newStatus,
                timestamp: new Date().toISOString()
            });

            localStorage.setItem('demo_orders', JSON.stringify(orders));
            console.log(`✅ Demo order ${orderId} status updated to ${newStatus}`);

            // Trigger event for real-time simulation
            window.dispatchEvent(new CustomEvent('demoOrderUpdated', { detail: { orderId, order: orders[orderIndex] } }));

            return { success: true };
        }
        return { success: false, error: 'Order not found' };
    }
    return window._firebaseOriginals.updateOrderStatus(orderId, newStatus);
};

// Override listenToOrderStatus for demo mode
listenToOrderStatus = function (orderId, callback) {
    if (DEMO_MODE) {
        // Set up event listener for demo mode
        const handler = (event) => {
            if (event.detail.orderId === orderId) {
                callback(event.detail.order);
            }
        };

        window.addEventListener('demoOrderUpdated', handler);

        // Return unsubscribe function
        return () => {
            window.removeEventListener('demoOrderUpdated', handler);
        };
    }
    return window._firebaseOriginals.listenToOrderStatus(orderId, callback);
};

console.log('✅ Demo mode extensions loaded');
