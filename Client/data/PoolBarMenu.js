

export const categoryList = [
        {
            id: 1,
            name: 'Meals',
            
        },
        {
            id: 2,
            name: 'Drinks',
        },
        {
            id: 3,
            name: 'Alcohol',
            subcategories: [
                {
                    name: 'Shots'
                },
                {
                    name: 'Glasses'
                },
                {
                    name: 'Cocktails'
                },
            ],
        },
    ];

    export const products = [
        { id : 11, name: 'Hamburger & Chips & Drink', price: 45, category: 'Meals', image: require('../assets/PoolBarIcon/burger_chips_drink.png') },
        {
            id: 12,
            name: 'Schnitzels & Chips & Drink', price: 35 , category: 'Meals' , image: require('../assets/PoolBarIcon/schnitzel_chips_drink.png')

        },
        {
            id: 13,
            name: 'Pizza', price: 40, category: 'Meals', image: require('../assets/RoomServices/pizza.png')
        },
        {
            id: 14,
            name: 'Pasta', price: 35, category: 'Meals' , image: require('../assets/RoomServices/pasta.png')
        },
        {
            id: 15,
            name: 'Salad', price: 30, category: 'Meals' , image: require('../assets/RoomServices/ceaser_salad.png')
        },
        {
            id: 21,
            name: 'Coke', price: 5, category: 'Drinks' , image: require('../assets/RoomServices/coke.png')
        },
        {
            id: 22,
            name: 'Nestea', price: 7, category: 'Drinks' , image: require('../assets/RoomServices/icetea.png')
        },
        {
            id: 23,
            name: 'Sprite', price: 5, category: 'Drinks' , image: require('../assets/PoolBarIcon/sprite.png')
        },
        {
            id: 24,
            name: 'RedBull', price: 8, category: 'Drinks', image: require('../assets/PoolBarIcon/redbull.png')
        },
        {
            id: 25,
            name: 'Water', price: 4, category: 'Drinks' , image: require('../assets/RoomServices/water.png')
        },
        {
            id: 31,
            name: 'Van Gogh', price: 15, category: 'Alcohol',subcategories: 'Shots', image: require('../assets/PoolBarIcon/van_gogh.png')
        },
        {
            id: 32,
            name: 'Arak', price: 10, category: 'Alcohol', subcategories: 'Shots', image: require('../assets/PoolBarIcon/arak.png')
        },
        {
            id: 33,
            name: 'Tequila', price: 15, category: 'Alcohol', subcategories: 'Shots', image: require('../assets/PoolBarIcon/tequila.png')
        },
        {
            id: 34,
            name: 'Red Bull Vodka', price: 45, category: 'Alcohol', subcategories: 'Glasses', image: require('../assets/PoolBarIcon/redbull_vodka.png')
        },
        {
            id: 35,
            name: 'Arak Lemons', price: 25, category: 'Alcohol', subcategories: 'Glasses', image: require('../assets/PoolBarIcon/arak_lemons.png')
        },
        {
            id: 36,
            name: 'Whiskey', price: 35, category: 'Alcohol', subcategories: 'Glasses', image: require('../assets/PoolBarIcon/whiskey.png')
        },
        {
            id: 37,
            name: 'Margarita', price: 35, category: 'Alcohol', subcategories: 'Cocktails', image: require('../assets/PoolBarIcon/margarita.png')
        },
        {
            id: 38,
            name: 'Aperol Spritz', price: 50, category: 'Alcohol', subcategories: 'Cocktails' , image: require('../assets/PoolBarIcon/aperol_spritz.png')
        },
        {
            id: 39,
            name: 'MANHATTAN', price: 55, category: 'Alcohol', subcategories: 'Cocktails' , image: require('../assets/PoolBarIcon/manhattan.png')
        },
    ]