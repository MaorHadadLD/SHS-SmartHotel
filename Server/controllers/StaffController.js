import  { StaffLogin } from '../actions/StaffAction.js';

export const requestSuccess = (data) => ({success: true, data})
export const requestFailure = (data) => ({ success: false, data });


export const StaffLoginController = async (req, res) => {
    console.log("StaffLoginController", req);
    const { employeeNumber, password } = req;
    const result = await StaffLogin(employeeNumber, password);
    console.log("StaffLoginController result", result.sucess);
    if (result.sucess) {
        return requestSuccess(result.data);
    }
    else {
        return requestFailure(result.data);
    }
}