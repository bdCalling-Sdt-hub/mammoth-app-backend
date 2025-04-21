import { ICreateAccount, IResetPassword } from '../types/emailTamplate';

const createAccount = (values: ICreateAccount) => {
  const data = {
    to: values.email,
    subject: 'Verify your account',
    html: `<body style="background-color: #fafafa; text-align: center; font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px;">
        <img src="https://i.ibb.co.com/S4XCH8wn/image-removebg-preview.png" alt="Logo" style="width: 180px; margin-bottom: 16px;">
        <h2>Please confirm your email ${values.name}</h2>
        <p>Use this code to confirm your email address.</p>
        <div style="background: #ebe3ff; border-radius: 8px; padding: 16px; font-size: 32px; font-weight: bold; letter-spacing: 8px; display: inline-block;">
            ${values.otp}
        </div>
        <p style="color: #555; margin-top: 16px;">This code is valid for 3 minutes.</p>
    </div>
</body>`,
  };
  return data;
};

const resetPassword = (values: IResetPassword) => {
  const data = {
    to: values.email,
    subject: 'Reset your password',
    html: `<body style="background-color: #fafafa; text-align: center; font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px;">
        <img src="https://i.ibb.co.com/S4XCH8wn/image-removebg-preview.png" alt="Logo" style="width: 180px; margin-bottom: 16px;">
        <h2>Your Validation Otp</h2>
        <p>Use this code to reset your password.</p>
        <div style="background: #ebe3ff; border-radius: 8px; padding: 16px; font-size: 32px; font-weight: bold; letter-spacing: 8px; display: inline-block;">
            ${values.otp}
        </div>
        <p style="color: #555; margin-top: 16px;">This code is valid for 3 minutes.</p>
    </div>
</body>`,
  };
  return data;
};

export const emailTemplate = {
  createAccount,
  resetPassword,
};
