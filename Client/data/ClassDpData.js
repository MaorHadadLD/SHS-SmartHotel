import ClassDpCategory from "../models/ClassDpCategory";
import Request from "../models/ClassRequest";

//This page contains the data of the departments in the hotel and the data of the requests

export const ClassDpCategories = [
    new ClassDpCategory('c1','Reception','white'),
    new ClassDpCategory('c2','Room Service','white'),
    new ClassDpCategory('c3','Cleaning Room','white'),
    new ClassDpCategory('c4','Pool Bar','white'),
    new ClassDpCategory('c5','Dining Room','white'),
    new ClassDpCategory('c6','Spa','white'),
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
