import ClassDpCategory from "../models/ClassDpCategory";
import Request from "../models/ClassRequest";

export const ClassDpCategories = [
    new ClassDpCategory('c1','Reception','#f5428d'),
    new ClassDpCategory('c2','Room Service','#f5a442'),
    new ClassDpCategory('c3','Cleaning Room','#368dff'),
    new ClassDpCategory('c4','Pool Bar','#yellow'),
];

export const Requests = [
    // reception 
    new Request(
        'r1',
        ['c1'], 
        'Is it possible to check out late?',
    ),
    new Request(
        'r2',
        ['c1'],
        'The room is not as I ordered',
    ),
    // Room Service
    new Request(
        'r3',
        ['c2'],
        'I would love to receive chocolates in the room',
    ),
    new Request(
        'r4',
        ['c2'],
        'I would love to receive champagne in the room',
    ),
    // Cleening room
    new Request(
        'r5',
        ['c3'],
        'The room is dirty',
    ),
    new Request(
        'r6',
        ['c3'],
        'No towels',
    ),
    // Pool Bar
    new Request(
        'r7',
        ['c4'],
        'can i get some mango margarita?',
    ),
    new Request(
        'r8',
        ['c4'],
        'can i get some chips and schnitzel?',
    ),
    
];
