import ClassDpCategory from "../models/ClassDpCategory";
import Request from "../models/ClassRequest";

//This page contains the data of the departments in the hotel and the data of the requests
import receptionImage from '../assets/reception.jpg';
import roomServiceImage from '../assets/room_service.jpg';
import cleaningRoomImage from '../assets/resort_cleaning.jpg';
import poolBarImage from '../assets/pool_bar.jpg';
import diningRoomImage from '../assets/dining_room.jpg';


export const ClassDpCategories = [
    new ClassDpCategory('Reception','Reception','white', receptionImage),
    new ClassDpCategory('RoomService','Room Service','white', roomServiceImage),
    new ClassDpCategory('CleaningRoom','Cleaning Room','white', cleaningRoomImage),
    new ClassDpCategory('PoolBar','Pool Bar','white', poolBarImage),
    new ClassDpCategory('DiningRoom','Dining Room','white', diningRoomImage),
];

export const Requests = [
    // reception 
    new Request(
        'r1',
        ['Reception'], 
        'Is it possible to check out late?',
    ),
    new Request(
        'r2',
        ['Reception'],
        'The room is not as I ordered',
    ),
    // Room Service
    new Request(
        'r3',
        ['RoomService'],
        'I would love to receive chocolates in the room',
    ),
    new Request(
        'r4',
        ['RoomService'],
        'I would love to receive champagne in the room',
    ),
    // Cleening room
    new Request(
        'r5',
        ['CleaningRoom'],
        'The room is not clean',
    ),
    new Request(
        'r6',
        ['CleaningRoom'],
        'No towels in the room.',
    ),
    new Request(
        'r9',
        ['CleaningRoom'],
        'There are no toiletries for the shower.',
    ),
    new Request(
        'r10',
        ['CleaningRoom'],
        'No toilet paper.',
    ),
    
    // Pool Bar
    new Request(
        'r7',
        ['PoolBar'],
        'can i get some mango margarita?',
    ),
    new Request(
        'r8',
        ['PoolBar'],
        'can i get some chips and schnitzel?',
    ),
    
];
