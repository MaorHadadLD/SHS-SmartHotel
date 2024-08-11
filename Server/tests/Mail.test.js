import nodemailer from 'nodemailer';
import { requestOTP } from '../controllers/GuestController.js'; // Adjust the path as necessary
import { updateGuestOPT } from '../actions/GuestAction.js'; // Assuming this is where the OTP is updated

jest.mock('nodemailer');
jest.mock('../actions/GuestAction.js'); // Mock the model function

const mockSendMail = jest.fn().mockResolvedValue({});
nodemailer.createTransport.mockReturnValue({
  sendMail: mockSendMail,
});

describe('Mail Route Tests', () => {
  beforeEach(() => {
    mockSendMail.mockClear();
    updateGuestOPT.mockClear();
  });

  it('should send an OTP email and return success', async () => {
    // Mock the updateGuestOPT to resolve as successful
    updateGuestOPT.mockResolvedValue(true);

    // Call the requestOTP function
    const response = await requestOTP({ email: 'test@example.com' });
    // Check that the correct success message is returned
    expect(response.data).toEqual("OTP resent successfully!");
  });

  it('should return failure when email is not found', async () => {
    // Mock the updateGuestOPT to fail (e.g., email not found)
    updateGuestOPT.mockResolvedValue(false);

    // Call the requestOTP function
    const response = await requestOTP({ email: 'test@example.com' });

    // Check that the correct failure message is returned
    expect(response.data).toEqual("Email not found");
  });
});
