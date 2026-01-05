

const SHOPS = {
    BITS_VEG: 'Bits and Bites (Veg)',
    BITS_NONVEG: 'Bits and Bites (Non-Veg)',
    ZUZU: 'Zu zu Zones',
    OASIS: 'Oasis',
    PURI_VURI: 'Puri Vuri'
};

const SHOP_MENU_DATA = [
    // ============================================
    // BITS AND BITES (VEG) - 15 Items
    // ============================================
    {
        name: 'Veg Fried Rice',
        price: 80,
        description: 'Aromatic fried rice with fresh vegetables and Indian spices',
        category: 'Meals',
        image: '🍚',
        shop: SHOPS.BITS_VEG,
        available: true
    },
    {
        name: 'Idly (4 pcs)',
        price: 40,
        description: 'Soft steamed rice cakes served with sambar and chutney',
        category: 'Breakfast',
        image: '🥟',
        shop: SHOPS.BITS_VEG,
        available: true
    },
    {
        name: 'Masala Dosa',
        price: 60,
        description: 'Crispy rice crepe filled with spiced potato filling',
        category: 'Breakfast',
        image: '🌯',
        shop: SHOPS.BITS_VEG,
        available: true
    },
    {
        name: 'Plain Dosa',
        price: 50,
        description: 'Crispy rice and lentil crepe served with chutney',
        category: 'Breakfast',
        image: '🌯',
        shop: SHOPS.BITS_VEG,
        available: true
    },
    {
        name: 'Roti with Dal',
        price: 70,
        description: 'Whole wheat flatbread served with delicious dal',
        category: 'Meals',
        image: '🫓',
        shop: SHOPS.BITS_VEG,
        available: true
    },
    {
        name: 'Paneer Butter Masala',
        price: 120,
        description: 'Cottage cheese in rich tomato and butter gravy',
        category: 'Meals',
        image: '🍛',
        shop: SHOPS.BITS_VEG,
        available: true
    },
    {
        name: 'Veg Biryani',
        price: 100,
        description: 'Fragrant basmati rice with mixed vegetables and spices',
        category: 'Meals',
        image: '🍲',
        shop: SHOPS.BITS_VEG,
        available: true
    },
    {
        name: 'Sambar Rice',
        price: 60,
        description: 'Rice mixed with South Indian lentil stew',
        category: 'Meals',
        image: '🍚',
        shop: SHOPS.BITS_VEG,
        available: true
    },
    {
        name: 'Curd Rice',
        price: 50,
        description: 'Cooling rice dish mixed with yogurt and tempering',
        category: 'Meals',
        image: '🍚',
        shop: SHOPS.BITS_VEG,
        available: true
    },
    {
        name: 'Veg Noodles',
        price: 85,
        description: 'Stir-fried noodles loaded with fresh vegetables',
        category: 'Snacks',
        image: '🍜',
        shop: SHOPS.BITS_VEG,
        available: true
    },
    {
        name: 'Gobi Manchurian',
        price: 90,
        description: 'Crispy cauliflower fritters in tangy Indo-Chinese sauce',
        category: 'Snacks',
        image: '🥘',
        shop: SHOPS.BITS_VEG,
        available: true
    },
    {
        name: 'Chana Masala',
        price: 80,
        description: 'Chickpeas cooked in aromatic North Indian spices',
        category: 'Meals',
        image: '🍛',
        shop: SHOPS.BITS_VEG,
        available: true
    },
    {
        name: 'Aloo Paratha',
        price: 55,
        description: 'Stuffed wheat bread with spiced potato filling',
        category: 'Breakfast',
        image: '🫓',
        shop: SHOPS.BITS_VEG,
        available: true
    },
    {
        name: 'Veg Pulao',
        price: 75,
        description: 'Mildly spiced rice with vegetables and aromatic spices',
        category: 'Meals',
        image: '🍚',
        shop: SHOPS.BITS_VEG,
        available: true
    },
    {
        name: 'Onion Dosa',
        price: 60,
        description: 'Crispy dosa topped with caramelized onions',
        category: 'Breakfast',
        image: '🌯',
        shop: SHOPS.BITS_VEG,
        available: true
    },

    // ============================================
    // BITS AND BITES (NON-VEG) - 14 Items
    // ============================================
    {
        name: 'Egg Fried Rice',
        price: 90,
        description: 'Classic fried rice with scrambled eggs and vegetables',
        category: 'Meals',
        image: '🍳',
        shop: SHOPS.BITS_NONVEG,
        available: true
    },
    {
        name: 'Chicken Fried Rice',
        price: 120,
        description: 'Wok-tossed rice with tender chicken pieces',
        category: 'Meals',
        image: '🍗',
        shop: SHOPS.BITS_NONVEG,
        available: true
    },
    {
        name: 'Chicken Biryani',
        price: 140,
        description: 'Aromatic basmati rice layered with marinated chicken',
        category: 'Meals',
        image: '🍛',
        shop: SHOPS.BITS_NONVEG,
        available: true
    },
    {
        name: 'Egg Biryani',
        price: 100,
        description: 'Flavorful rice dish with boiled eggs and spices',
        category: 'Meals',
        image: '🥚',
        shop: SHOPS.BITS_NONVEG,
        available: true
    },
    {
        name: 'Chicken Curry',
        price: 130,
        description: 'Traditional chicken curry with rich gravy',
        category: 'Meals',
        image: '🍛',
        shop: SHOPS.BITS_NONVEG,
        available: true
    },
    {
        name: 'Butter Chicken',
        price: 150,
        description: 'Creamy tomato-based curry with tender chicken',
        category: 'Meals',
        image: '🍗',
        shop: SHOPS.BITS_NONVEG,
        available: true
    },
    {
        name: 'Chicken 65',
        price: 110,
        description: 'Spicy deep-fried chicken with South Indian flavors',
        category: 'Snacks',
        image: '🍗',
        shop: SHOPS.BITS_NONVEG,
        available: true
    },
    {
        name: 'Egg Curry',
        price: 80,
        description: 'Boiled eggs in spicy onion-tomato gravy',
        category: 'Meals',
        image: '🥚',
        shop: SHOPS.BITS_NONVEG,
        available: true
    },
    {
        name: 'Chicken Noodles',
        price: 110,
        description: 'Stir-fried noodles with chicken and veggies',
        category: 'Snacks',
        image: '🍜',
        shop: SHOPS.BITS_NONVEG,
        available: true
    },
    {
        name: 'Mutton Biryani',
        price: 180,
        description: 'Premium biryani with succulent mutton pieces',
        category: 'Meals',
        image: '🍛',
        shop: SHOPS.BITS_NONVEG,
        available: true
    },
    {
        name: 'Fish Curry',
        price: 140,
        description: 'Fresh fish cooked in tangy coastal-style curry',
        category: 'Meals',
        image: '🐟',
        shop: SHOPS.BITS_NONVEG,
        available: true
    },
    {
        name: 'Chicken Kebab',
        price: 125,
        description: 'Grilled chicken skewers with aromatic spices',
        category: 'Snacks',
        image: '🍢',
        shop: SHOPS.BITS_NONVEG,
        available: true
    },
    {
        name: 'Egg Omelette',
        price: 45,
        description: 'Fluffy omelette with onions and spices',
        category: 'Breakfast',
        image: '🍳',
        shop: SHOPS.BITS_NONVEG,
        available: true
    },
    {
        name: 'Prawn Curry',
        price: 160,
        description: 'Juicy prawns in coconut-based spicy curry',
        category: 'Meals',
        image: '🦐',
        shop: SHOPS.BITS_NONVEG,
        available: true
    },

    // ============================================
    // ZU ZU ZONES - 14 Items
    // ============================================
    {
        name: 'Cold Coffee',
        price: 70,
        description: 'Chilled coffee blended with milk and ice',
        category: 'Beverages',
        image: '☕',
        shop: SHOPS.ZUZU,
        available: true
    },
    {
        name: 'Boba Coffee',
        price: 90,
        description: 'Coffee with chewy tapioca pearls',
        category: 'Beverages',
        image: '🧋',
        shop: SHOPS.ZUZU,
        available: true
    },
    {
        name: 'Iced Tea',
        price: 50,
        description: 'Refreshing lemon iced tea',
        category: 'Beverages',
        image: '🍹',
        shop: SHOPS.ZUZU,
        available: true
    },
    {
        name: 'Mango Smoothie',
        price: 85,
        description: 'Creamy mango smoothie with fresh fruit',
        category: 'Beverages',
        image: '🥭',
        shop: SHOPS.ZUZU,
        available: true
    },
    {
        name: 'Strawberry Shake',
        price: 80,
        description: 'Thick strawberry milkshake topped with cream',
        category: 'Beverages',
        image: '🍓',
        shop: SHOPS.ZUZU,
        available: true
    },
    {
        name: 'Chocolate Shake',
        price: 85,
        description: 'Rich chocolate milkshake with ice cream',
        category: 'Beverages',
        image: '🍫',
        shop: SHOPS.ZUZU,
        available: true
    },
    {
        name: 'Fresh Lime Soda',
        price: 40,
        description: 'Refreshing lime soda with mint',
        category: 'Beverages',
        image: '🍋',
        shop: SHOPS.ZUZU,
        available: true
    },
    {
        name: 'Mojito',
        price: 75,
        description: 'Mint mojito with fresh lime and soda',
        category: 'Beverages',
        image: '🍹',
        shop: SHOPS.ZUZU,
        available: true
    },
    {
        name: 'Oreo Shake',
        price: 95,
        description: 'Creamy shake blended with Oreo cookies',
        category: 'Beverages',
        image: '🥤',
        shop: SHOPS.ZUZU,
        available: true
    },
    {
        name: 'Vanilla Frappe',
        price: 80,
        description: 'Icy vanilla coffee frappe with whipped cream',
        category: 'Beverages',
        image: '☕',
        shop: SHOPS.ZUZU,
        available: true
    },
    {
        name: 'Green Tea',
        price: 35,
        description: 'Healthy hot green tea',
        category: 'Beverages',
        image: '🍵',
        shop: SHOPS.ZUZU,
        available: true
    },
    {
        name: 'Masala Chai',
        price: 30,
        description: 'Traditional Indian spiced tea',
        category: 'Beverages',
        image: '☕',
        shop: SHOPS.ZUZU,
        available: true
    },
    {
        name: 'Black Coffee',
        price: 40,
        description: 'Strong black coffee for coffee lovers',
        category: 'Beverages',
        image: '☕',
        shop: SHOPS.ZUZU,
        available: true
    },
    {
        name: 'Fruit Punch',
        price: 65,
        description: 'Mixed fruit juice blend',
        category: 'Beverages',
        image: '🍹',
        shop: SHOPS.ZUZU,
        available: true
    },

    // ============================================
    // OASIS - 14 Items
    // ============================================
    {
        name: 'Margherita Pizza',
        price: 180,
        description: 'Classic pizza with mozzarella and basil',
        category: 'Meals',
        image: '🍕',
        shop: SHOPS.OASIS,
        available: true
    },
    {
        name: 'Pepperoni Pizza',
        price: 220,
        description: 'Pizza loaded with pepperoni slices',
        category: 'Meals',
        image: '🍕',
        shop: SHOPS.OASIS,
        available: true
    },
    {
        name: 'Veggie Pizza',
        price: 200,
        description: 'Pizza topped with fresh vegetables',
        category: 'Meals',
        image: '🍕',
        shop: SHOPS.OASIS,
        available: true
    },
    {
        name: 'Chicken Pizza',
        price: 230,
        description: 'Pizza with grilled chicken and cheese',
        category: 'Meals',
        image: '🍕',
        shop: SHOPS.OASIS,
        available: true
    },
    {
        name: 'French Fries',
        price: 60,
        description: 'Crispy golden French fries',
        category: 'Snacks',
        image: '🍟',
        shop: SHOPS.OASIS,
        available: true
    },
    {
        name: 'Cheese Fries',
        price: 80,
        description: 'French fries loaded with melted cheese',
        category: 'Snacks',
        image: '🍟',
        shop: SHOPS.OASIS,
        available: true
    },
    {
        name: 'Garlic Bread',
        price: 70,
        description: 'Toasted bread with garlic butter',
        category: 'Snacks',
        image: '🥖',
        shop: SHOPS.OASIS,
        available: true
    },
    {
        name: 'Chicken Wings',
        price: 140,
        description: 'Spicy grilled chicken wings',
        category: 'Snacks',
        image: '🍗',
        shop: SHOPS.OASIS,
        available: true
    },
    {
        name: 'Veg Burger',
        price: 90,
        description: 'Burger with veggie patty and fresh veggies',
        category: 'Snacks',
        image: '🍔',
        shop: SHOPS.OASIS,
        available: true
    },
    {
        name: 'Chicken Burger',
        price: 120,
        description: 'Juicy chicken burger with special sauce',
        category: 'Snacks',
        image: '🍔',
        shop: SHOPS.OASIS,
        available: true
    },
    {
        name: 'Cheese Burger',
        price: 110,
        description: 'Classic burger with extra cheese',
        category: 'Snacks',
        image: '🍔',
        shop: SHOPS.OASIS,
        available: true
    },
    {
        name: 'Nachos',
        price: 100,
        description: 'Crispy nachos with cheese dip and salsa',
        category: 'Snacks',
        image: '🌮',
        shop: SHOPS.OASIS,
        available: true
    },
    {
        name: 'Onion Rings',
        price: 75,
        description: 'Crispy fried onion rings',
        category: 'Snacks',
        image: '🧅',
        shop: SHOPS.OASIS,
        available: true
    },
    {
        name: 'Loaded Fries',
        price: 120,
        description: 'Fries topped with cheese, sauce and toppings',
        category: 'Snacks',
        image: '🍟',
        shop: SHOPS.OASIS,
        available: true
    },

    // ============================================
    // PURI VURI - 13 Items
    // ============================================
    {
        name: 'Pani Puri',
        price: 40,
        description: 'Crispy puris filled with spicy tangy water',
        category: 'Snacks',
        image: '🥟',
        shop: SHOPS.PURI_VURI,
        available: true
    },
    {
        name: 'Masala Puri',
        price: 50,
        description: 'Crispy puris with spicy potato filling',
        category: 'Snacks',
        image: '🥟',
        shop: SHOPS.PURI_VURI,
        available: true
    },
    {
        name: 'Dahi Puri',
        price: 50,
        description: 'Puris filled with yogurt and chutneys',
        category: 'Snacks',
        image: '🥟',
        shop: SHOPS.PURI_VURI,
        available: true
    },
    {
        name: 'Sev Puri',
        price: 45,
        description: 'Crispy puris topped with sev and chutneys',
        category: 'Snacks',
        image: '🥟',
        shop: SHOPS.PURI_VURI,
        available: true
    },
    {
        name: 'Bhel Puri',
        price: 40,
        description: 'Puffed rice mixed with vegetables and chutneys',
        category: 'Snacks',
        image: '🥗',
        shop: SHOPS.PURI_VURI,
        available: true
    },
    {
        name: 'Papdi Chaat',
        price: 55,
        description: 'Crispy wafers with yogurt and chutneys',
        category: 'Snacks',
        image: '🥗',
        shop: SHOPS.PURI_VURI,
        available: true
    },
    {
        name: 'Aloo Tikki Chaat',
        price: 60,
        description: 'Potato patties topped with yogurt and sauces',
        category: 'Snacks',
        image: '🥔',
        shop: SHOPS.PURI_VURI,
        available: true
    },
    {
        name: 'Samosa Chaat',
        price: 65,
        description: 'Crispy samosa with chickpeas and chutneys',
        category: 'Snacks',
        image: '🥟',
        shop: SHOPS.PURI_VURI,
        available: true
    },
    {
        name: 'Raj Kachori',
        price: 70,
        description: 'Large stuffed kachori with various fillings',
        category: 'Snacks',
        image: '🥟',
        shop: SHOPS.PURI_VURI,
        available: true
    },
    {
        name: 'Pav Bhaji',
        price: 80,
        description: 'Spicy vegetable curry with buttered bread',
        category: 'Snacks',
        image: '🥖',
        shop: SHOPS.PURI_VURI,
        available: true
    },
    {
        name: 'Vada Pav',
        price: 35,
        description: 'Spicy potato fritter in a bun',
        category: 'Snacks',
        image: '🍔',
        shop: SHOPS.PURI_VURI,
        available: true
    },
    {
        name: 'Dabeli',
        price: 40,
        description: 'Sweet and spicy potato filling in pav',
        category: 'Snacks',
        image: '🍔',
        shop: SHOPS.PURI_VURI,
        available: true
    },
    {
        name: 'Mix Chaat',
        price: 55,
        description: 'Variety chaat with multiple ingredients',
        category: 'Snacks',
        image: '🥗',
        shop: SHOPS.PURI_VURI,
        available: true
    }
];
