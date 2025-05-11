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

const addUserEmail = (values: { name: string, email: string, password: string, role: string }) => {
  return {
    to: values.email,
    subject: "Welcome to Mammoth – Your Account Details Inside",
    text: `
Hi ${values.name},

You've been successfully added to Mammoth.

Login Details:
Email: ${values.email}
Temporary Password: ${values.password}
Role: ${values.role.toUpperCase()}

Login here: https://rahat3000.binarybards.online/login

Please change your password after login.

– Mammoth Team
    `,
    html: `
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 40px 0;">
  <div style="max-width: 600px; margin: auto; background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    
    <div style="text-align: center;">
      <img src="https://i.ibb.co/S4XCH8w/image-removebg-preview.png" alt="Mammoth Logo" style="width: 120px; margin-bottom: 20px;" />
    </div>

    <h2 style="color: #333;">Welcome to Mammoth, ${values.name}!</h2>

    <p style="color: #555;">Your account has been successfully created. Below are your login details:</p>

    <div style="background-color: #f9f9f9; padding: 15px 20px; border-left: 4px solid #28a745; margin: 20px 0; border-radius: 6px;">
      <p><strong>Email:</strong> ${values.email}</p>
      <p><strong>Temporary Password:</strong> ${values.password}</p>
      <p><strong>Role:</strong> ${values.role.toUpperCase()}</p>
    </div>

    <p>Please log in using the button below and update your password after logging in.</p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://rahat3000.binarybards.online/login" target="_blank" style="background-color: #28a745; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Log In to Mammoth</a>
    </div>

    <p style="font-size: 14px; color: #999;">If you did not expect this email, you can safely ignore it.</p>

    <hr style="margin-top: 40px;" />
    <p style="font-size: 12px; color: #aaa; text-align: center;">
      Mammoth Platform | All rights reserved
    </p>
  </div>
</body>
`
  };
}

export const emailTemplate = {
  createAccount,
  resetPassword,
  addUserEmail
};
