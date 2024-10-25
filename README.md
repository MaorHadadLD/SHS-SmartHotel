# SHS - Smart Hotel System
A mobile platform enhancing hotel management with self-service features, enabling guests to independently manage their stay, communicate with staff, and enjoy a seamless hospitality experience.

## Table of Contents
- [ Overview ](#over)
- [ Features ](#Features)
- [ Project Structure ](#PStructure)
- [ Technologies ](#Technologies)
- [ Installation ](#Installation)
- [ Usage Guide ](#usage)
- [ Contributing ](#Contributing)
- [ License ](#License)
- [ Contact ](#Contact)

<a name="over"></a>
## Overview

In response to the need for touchless, efficient hotel experiences, SHS - Smart Hotel streamlines room service, check-in, dining, and other guest services through a user-friendly app. This project focuses on improving guest satisfaction and operational efficiency by providing a personalized, intuitive stay management solution.

<a name="Features"></a>
## Features

- **Self Check-In/Out:** QR-based check-in/out process for a quick start and end to the guest experience.
- **Real-Time Room and Service Management:** Guests can request and track services like room service, cleaning, and dining reservations.
- **Dining and Activity Information:** View dining menus, activity schedules, and nearby attractions.
- **Direct Communication:** Guests can chat with reception staff in real time.
- **Service Request Tracking:** Follow the status of requests and interact directly with the relevant department.
- **Accessibility and Multi-Platform Compatibility:** Cross-platform support ensures functionality across devices with ease of use for all.

<a name="PStructure"></a>
## Project Structure

The project is organized into client and server directories.

- Client: Contains the React Native mobile app.
  - `Expo` for app deployment and development.
  - Main Screens: Includes login, check-in, room services, and direct chat functionality with hotel reception staff.
- Server: Contains the Node.js server for handling requests and database management.
  - `Express.js` for API creation.
  - Firebase Realtime Database for storing data on guests, requests, and hotel resources.



<a name="Technologies"></a>
## Technologies

- **Frontend:** React Native, Expo
- **Backend:** Node.js, Express.js, cors, nodemon
- **Database:** Firebase Realtime Database
- **Additional Libraries:**
  - **Socket.io:** Real-time communication
  - **Axios:** Data fetching
  - **Nodemailer:** Email integration
  - **Jest:** Unit testing

<a name="Installation"></a>
## Installation

### Client
1. **Clone the client repository and navigate to it:**
  ```
git clone https://github.com/MaorHadadLD/SHS-SmartHotel/tree/main/client
```
  ```
cd client
```
2. **Install dependencies:**
```
npm install
```
3. **Run the client application with Expo:**
```
npm start
```
### Server
1. **Clone the client repository and navigate to it:**
  ```
  git clone https://github.com/MaorHadadLD/SHS-SmartHotel/tree/main/server
  ```
  ```
cd server
```
2. **Install dependencies:**
```
npm install
```
3. **Set up environment variables for Firebase and other configuration settings.**
4. **Run the client application with Expo:**
```
npm start
```

<a name="usage"></a>
## Usage Guide



<a name="Contributing"></a>
## Contributing

Please submit a pull request with a detailed description of the changes made. We appreciate any contributions that improve functionality or performance.

<a name="License"></a>
## License

This project is licensed under the MIT License.

<a name="Contact"></a>
## Contact

For any inquiries, please contact us:

Raphael Benoliel: raphael2gb@gmail.com

Maor Hadad: maorhadad94@gmail.com

