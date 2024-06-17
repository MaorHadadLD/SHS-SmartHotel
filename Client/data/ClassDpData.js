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
   
    new Request('r5', ['CleaningRoom'], 'The room is not clean'),
    new Request('r6', ['CleaningRoom'], 'No towels in the room.'),
    new Request('r9', ['CleaningRoom'], 'There are no toiletries for the shower.'),
    new Request('r10', ['CleaningRoom'], 'No toilet paper.'),
    new Request('r11', ['CleaningRoom'], 'Extra pillows'),
    new Request('r12', ['CleaningRoom'], 'A blanket'),
    new Request('r13', ['CleaningRoom'], 'Room freshener')
    
];
