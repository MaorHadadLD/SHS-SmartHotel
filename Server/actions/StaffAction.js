import firebaseApp from '../firebaseConfig.js';
import { getDatabase, ref, get } from 'firebase/database';

const db = getDatabase(firebaseApp);
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


