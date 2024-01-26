import  { StaffLogin } from '../actions/StaffAction.js';

export const requestSuccess = (data) => ({success: true, data})
export const requestFailure = (data) => ({ success: false, data });


export const StaffLoginController = async (req, res) => {
    const { employeeNumber, password } = req.body;
    const result = await StaffLogin(employeeNumber, password);
    if (result.success) {
        res.status(200).json(requestSuccess(result.data))
    }
    else {
        res.status(400).json(requestFailure(result.data))
    }
}