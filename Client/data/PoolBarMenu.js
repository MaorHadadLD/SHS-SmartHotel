

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
        {
            id : 11,
                 name: 'Hamburger + Chips + Drink', price: 45, category: 'Meals', image: '../../../assets/mod1.jpg'
        },
        {
            id: 12,
            name: 'Schnitzels + Chips + Drink', price: 35 , category: 'Meals'   

        },
        {
            id: 13,
            name: 'Pizza', price: 40, category: 'Meals'
        },
        {
            id: 14,
            name: 'Pasta', price: 35, category: 'Meals'
        },
        {
            id: 15,
            name: 'Salad', price: 30, category: 'Meals'
        },
        {
            id: 21,
            name: 'Coke', price: 5, category: 'Drinks'
        },
        {
            id: 22,
            name: 'Nasty', price: 7, category: 'Drinks'
        },
        {
            id: 23,
            name: 'Sprite', price: 5, category: 'Drinks'
        },
        {
            id: 24,
            name: 'Excel', price: 8, category: 'Drinks'
        },
        {
            id: 25,
            name: 'Water', price: 4, category: 'Drinks'
        },
        {
            id: 31,
            name: 'Van Gogh', price: 15, category: 'Alcohol',subcategories: 'Shots'
        },
        {
            id: 32,
            name: 'Arak', price: 10, category: 'Alcohol', subcategories: 'Shots'
        },
        {
            id: 33,
            name: 'Tequila', price: 15, category: 'Alcohol', subcategories: 'Shots' 
        },
        {
            id: 34,
            name: 'Red Bull Vodka', price: 45, category: 'Alcohol', subcategories: 'Glasses'
        },
        {
            id: 35,
            name: 'Arak Lemons', price: 25, category: 'Alcohol', subcategories: 'Glasses'
        },
        {
            id: 36,
            name: 'Whiskey', price: 35, category: 'Alcohol', subcategories: 'Glasses'
        },
        {
            id: 37,
            name: 'Margarita', price: 35, category: 'Alcohol', subcategories: 'Cocktails'
        },
        {
            id: 38,
            name: 'Bloody Mary', price: 50, category: 'Alcohol', subcategories: 'Cocktails'
        },
        {
            id: 39,
            name: 'MANHATTAN', price: 55, category: 'Alcohol', subcategories: 'Cocktails'
        },
    ]