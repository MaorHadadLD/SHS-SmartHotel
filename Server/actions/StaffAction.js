import firebase from '../firebaseConfig';
import { getDatabase, ref, get } from 'firebase/database';

const db = getDatabase(firebase);
export const StaffLogin = async (employeeNumber, password) => {
    try {
        // Remove the duplicate declaration of employeeRef
        // const employeeRef = ref(db, `staff/${employeeNumber}`);

        // Move the declaration to the correct position
        const employeeRef = ref(db, `staff/${employeeNumber}`);

        const snapshot = await get(employeeRef);
        if (snapshot.exists()) {
            // Employee exists, check the password
            const employeeData = snapshot.val();
          
            // Ensure employeeData.password is a string before trimming
            const trimmedPassword = String(employeeData.password).trim();
          
            if (trimmedPassword === password.trim()) {
                return {sucess:true, data:employeeData}
            }
            else {
                return {sucess:false, data:"Incorrect password"}
            }
        }
        else {
            return {sucess:false, data:"Employee does not exist"}
        }
    }
    catch (error) {
        return {sucess:false, data:error.message}
    }
}



// Check if the employee exists in the database
// const employeeRef = ref(db, `staff/${employeeNumber}`);
// const snapshot = await get(employeeRef);

// if (snapshot.exists()) {
//   // Employee exists, check the password
//   const employeeData = snapshot.val();

//   // Ensure employeeData.password is a string before trimming
//   const trimmedPassword = String(employeeData.password).trim();

//   if (trimmedPassword === password.trim()) {
//     // Password is correct, navigate to StaffHomeScreen
//     navigation.navigate('StaffHomeScreen', {
//       roles: [employeeData.role], // Pass the role as an array
//       employeeName: employeeData.employeeName,
//       employeeNumber: employeeData.employeeNumber,
//       role: employeeData.role,
//       hotel: employeeData.hotel,
//     });
//   } else {
//     // Password is incorrect
//     console.error('Incorrect password');
//   }
// } else {
//   // Employee does not exist
//   console.error('Employee does not exist');
// }
// } catch (error) {
// console.error('Staff login error:', error.message);
// // Handle login error, show error message, etc.
// }