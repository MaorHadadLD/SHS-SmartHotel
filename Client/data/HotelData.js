// import ClassHotel from "../models/ClassHotel";
// import { getDatabase, ref, set } from 'firebase/database';
// import app from '../firebaseConfig'; // Import your Firebase configuration

// /*
//     On this page are the data for the hotels
// */

// export const HotelModel =[
//     new ClassHotel(
//         'Dan Hotel',
//         'h1',
//         'Tel Aviv',
//         'Meals are served in the hotel restaurant between the hours of 07:30 - 12:00.',
//         'Meals are served in the hotel restaurant between 6:30 - 9:00 p.m.',
//         'Open every day of the week between 12:00 - 00:00.',
//         'You can enjoy a variety of pampering body treatments and massages. Treatments can be ordered through the main menu in the application. Opening hours every day of the week: 8:00 - 20:00',
//         'The internet is free on the WIFI network: DANFREE',
//         'The gym is on the 1st floor, hours of operation: 8:30 - 20:00',
//         'The hotel entertainment hours are announced at the reception desk',
//         'The pool operating hours are: 8:00 - 18:30.',
//         'The pool bar is open every day of the week between 10:30 and 18:00.',
//         'The synagogue is located on the ground floor, prayer times are announced at the reception.',
//         'It is possible to get a mechanical key to the room with a deposit of NIS 250. Please come to the reception on Friday to receive the key until one hour before entering the Sabbath.',
//         'Rooms are vacated on weekdays by 11:00 a.m., on Saturday mornings by 2:00 p.m.'
//       ),
//     new ClassHotel(
//         'Dan Hotel',
//         'h2',
//         'Eilat',
//         'Meals are served in the hotel restaurant between the hours of 07:30 - 12:00.',
//         'Meals are served in the hotel restaurant between 6:30 - 9:00 p.m.',
//         'Open every day of the week between 12:00 - 00:00.',
//         'You can enjoy a variety of pampering body treatments and massages. Treatments can be ordered through the main menu in the application. Opening hours every day of the week: 8:00 - 20:00',
//         'The internet is free on the WIFI network: DANFREE',
//         'The gym is on the 1st floor, hours of operation: 8:30 - 20:00',
//         'The hotel entertainment hours are announced at the reception desk',
//         'The pool operating hours are: 8:00 - 18:30.',
//         'The pool buffet is open every day of the week between 10:30 and 18:00.',
//         'The synagogue is located on the ground floor, prayer times are announced at the reception.',
//         'It is possible to get a mechanical key to the room with a deposit of NIS 250. Please come to the reception on Friday to receive the key until one hour before entering the Sabbath.',
//         'Rooms are vacated on weekdays by 11:00 a.m., on Saturday mornings by 2:00 p.m.'
//         ),
//     new ClassHotel(
//         'Sheraton Hotel',
//         'h3',
//         'Tel Aviv',
//         'Meals are served in the hotel restaurant between the hours of 07:30 - 10:00.',
//         'Meals are served in the hotel restaurant between 8:00 - 10:00 p.m.',
//         'Open every day of the week between 12:00 - 00:00.',
//         'You can enjoy a variety of pampering body treatments and massages. Treatments can be ordered through the main menu in the application. Opening hours every day of the week: 8:00 - 20:00',
//         'The internet is free on the WIFI network: SheratonFREE',
//         'The gym is on the 1st floor, hours of operation: 8:30 - 20:00',
//         'The hotel entertainment hours are announced at the reception desk',
//         'The pool operating hours are: 8:00 - 18:30.',
//         'The pool buffet is open every day of the week between 10:30 and 18:00.',
//         'The synagogue is located on the ground floor, prayer times are announced at the reception.',
//         'It is possible to get a mechanical key to the room with a deposit of NIS 250. Please come to the reception on Friday to receive the key until one hour before entering the Sabbath.',
//         'Rooms are vacated on weekdays by 11:00 a.m., on Saturday mornings by 2:00 p.m.'
//         ),
//     new ClassHotel(
//         'King David Hotel',
//         'h4',
//         'Tel Aviv',
//         'Meals are served in the hotel restaurant between the hours of 08:30 - 11:00.',
//         'Meals are served in the hotel restaurant between 8:00 - 10:00 p.m.',
//         'Open every day of the week between 12:00 - 00:00.',
//         'You can enjoy a variety of pampering body treatments and massages. Treatments can be ordered through the main menu in the application. Opening hours every day of the week: 8:00 - 20:00',
//         'The internet is free on the WIFI network: DavidHotelFREE',
//         'The gym is on the 1st floor, hours of operation: 8:30 - 20:00',
//         'The hotel entertainment hours are announced at the reception desk',
//         'The pool operating hours are: 8:00 - 18:30.',
//         'The pool buffet is open every day of the week between 10:30 and 18:00.',
//         'The synagogue is located on the ground floor, prayer times are announced at the reception.',
//         'It is possible to get a mechanical key to the room with a deposit of NIS 250. Please come to the reception on Friday to receive the key until one hour before entering the Sabbath.',
//         'Rooms are vacated on weekdays by 11:00 a.m., on Saturday by 2:00 p.m.'
//           ),
//     new ClassHotel(
//         'The Harrods Hotel',
//         'h5',
//         'Tel Aviv',
//         'Meals are served in the hotel restaurant between the hours of 08:30 - 11:00.',
//         'Meals are served in the hotel restaurant between 8:00 - 10:00 p.m.',
//         'Open every day of the week between 12:00 - 00:00.',
//         'You can enjoy a variety of pampering body treatments and massages. Treatments can be ordered through the main menu in the application. Opening hours every day of the week: 8:00 - 20:00',
//         'The internet is free on the WIFI network: HarrodsFREE',
//         'The gym is on the 1st floor, hours of operation: 8:30 - 20:00',
//         'The hotel entertainment hours are announced at the reception desk',
//         'The pool operating hours are: 8:00 - 18:30.',
//         'The pool buffet is open every day of the week between 10:30 and 18:00.',
//         'The synagogue is located on the ground floor, prayer times are announced at the reception.',
//         'It is possible to get a mechanical key to the room with a deposit of NIS 250. Please come to the reception on Friday to receive the key until one hour before entering the Sabbath.',
//         'Rooms are vacated on weekdays by 11:00 a.m., on Saturday by 2:00 p.m.'
//           ),
//     new ClassHotel(
//         'The Harrods Hotel',
//         'h6',
//         'Eilat',
//         'Meals are served in the hotel restaurant between the hours of 08:30 - 11:00.',
//         'Meals are served in the hotel restaurant between 8:00 - 10:00 p.m.',
//         'Open every day of the week between 12:00 - 00:00.',
//         'You can enjoy a variety of pampering body treatments and massages. Treatments can be ordered through the main menu in the application. Opening hours every day of the week: 8:00 - 20:00',
//         'The internet is free on the WIFI network: HarrodsFREE',
//         'The gym is on the 1st floor, hours of operation: 8:30 - 20:00',
//         'The hotel entertainment hours are announced at the reception desk',
//         'The pool operating hours are: 8:00 - 18:30.',
//         'The pool buffet is open every day of the week between 10:30 and 18:00.',
//         'The synagogue is located on the ground floor, prayer times are announced at the reception.',
//         'It is possible to get a mechanical key to the room with a deposit of NIS 250. Please come to the reception on Friday to receive the key until one hour before entering the Sabbath.',
//         'Rooms are vacated on weekdays by 11:00 a.m., on Saturday by 2:00 p.m.'
//         ),
//     new ClassHotel(
//         'King Solomon Hotel',
//         'h7',
//         'Tiberias',
//         'Meals are served in the hotel restaurant between the hours of 08:30 - 11:00.',
//         'Meals are served in the hotel restaurant between 8:00 - 10:00 p.m.',
//         'Open every day of the week between 12:00 - 00:00.',
//         'You can enjoy a variety of pampering body treatments and massages. Treatments can be ordered through the main menu in the application. Opening hours every day of the week: 8:00 - 20:00',
//         'The internet is free on the WIFI network: KingSolomonFREE',
//         'The gym is on the 1st floor, hours of operation: 8:30 - 20:00',
//         'The hotel entertainment hours are announced at the reception desk',
//         'The pool operating hours are: 8:00 - 18:30.',
//         'The pool buffet is open every day of the week between 10:30 and 18:00.',
//         'The synagogue is located on the ground floor, prayer times are announced at the reception.',
//         'It is possible to get a mechanical key to the room with a deposit of NIS 250. Please come to the reception on Friday to receive the key until one hour before entering the Sabbath.',
//         'Rooms are vacated on weekdays by 11:00 a.m., on Saturday by 2:00 p.m.'
//         ),
//     new ClassHotel(
//         'Hotel Leonardo',
//         'h8',
//         'Tiberias',
//         'Meals are served in the hotel restaurant between the hours of 08:30 - 11:00.',
//         'Meals are served in the hotel restaurant between 8:00 - 10:00 p.m.',
//         'Open every day of the week between 12:00 - 00:00.',
//         'You can enjoy a variety of pampering body treatments and massages. Treatments can be ordered through the main menu in the application. Opening hours every day of the week: 8:00 - 20:00',
//         'The internet is free on the WIFI network: LeonardoFREE',
//         'The gym is on the 1st floor, hours of operation: 8:30 - 20:00',
//         'The hotel entertainment hours are announced at the reception desk',
//         'The pool operating hours are: 8:00 - 18:30.',
//         'The pool buffet is open every day of the week between 10:30 and 18:00.',
//         'The synagogue is located on the ground floor, prayer times are announced at the reception.',
//         'It is possible to get a mechanical key to the room with a deposit of NIS 250. Please come to the reception on Friday to receive the key until one hour before entering the Sabbath.',
//         'Rooms are vacated on weekdays by 11:00 a.m., on Saturday by 2:00 p.m.'
//         ),
//     new ClassHotel(
//         'Hotel Leonardo',
//         'h9',
//         'Eilat',
//         'Meals are served in the hotel restaurant between the hours of 08:30 - 11:00.',
//         'Meals are served in the hotel restaurant between 8:00 - 10:00 p.m.',
//         'Open every day of the week between 12:00 - 00:00.',
//         'You can enjoy a variety of pampering body treatments and massages. Treatments can be ordered through the main menu in the application. Opening hours every day of the week: 8:00 - 20:00',
//         'The internet is free on the WIFI network: LeonardoFREE',
//         'The gym is on the 1st floor, hours of operation: 8:30 - 20:00',
//         'The hotel entertainment hours are announced at the reception desk',
//         'The pool operating hours are: 8:00 - 18:30.',
//         'The pool buffet is open every day of the week between 10:30 and 18:00.',
//         'The synagogue is located on the ground floor, prayer times are announced at the reception.',
//         'It is possible to get a mechanical key to the room with a deposit of NIS 250. Please come to the reception on Friday to receive the key until one hour before entering the Sabbath.',
//         'Rooms are vacated on weekdays by 11:00 a.m., on Saturday by 2:00 p.m.'
//         ),
// ];

// export const exportDataToFirebase = async () => {
//     const database = getDatabase(app);
//     const hotelsRef = ref(database, 'hotels');

//     try {
//         for (const hotel of HotelModel) {
//             await set(hotelsRef, hotel.id, { ...hotel });
//         }

//         console.log('Data exported to Firebase successfully');
//     } catch (error) {
//         console.error('Error exporting data to Firebase:', error);
//     }
// };