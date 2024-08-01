import nodemailer from 'nodemailer';
import { sendEmail, sendEmailRoom } from '../routes/MailRoute.js';

jest.mock('nodemailer');

const mockSendMail = jest.fn().mockResolvedValue({});

nodemailer.createTransport.mockReturnValue({
  sendMail: mockSendMail,
});

describe('Mail Route Tests', () => {
  beforeEach(() => {
    mockSendMail.mockClear();
  });

  it('should send an OTP email', async () => {
    await sendEmail('test@example.com', '123456');
    expect(mockSendMail).toHaveBeenCalledWith(expect.objectContaining({
      to: 'test@example.com',
      subject: 'SHS Smart Hotel - Password Reset OTP',
      html: expect.stringContaining('123456')
    }));
  });

  it('should send a room details email', async () => {
    await sendEmailRoom('test@example.com', '101');
    expect(mockSendMail).toHaveBeenCalledWith(expect.objectContaining({
      to: 'test@example.com',
      subject: 'Welcome to SHS Smart Hotel - Your Room Awaits!',
      html: expect.stringContaining('Room Number: 101')
    }));
  });
});
