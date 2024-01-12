// services/MailService.js
import nodemailer from "nodemailer";

export const sendWeatherReport = async (email, city, fetchWeatherData) => {
  try {
    const weatherData = await fetchWeatherData(city);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_EMAIL_PW,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Hourly Weather Report",
      text: `Temperature: ${weatherData.temperature}°C, Description: ${weatherData.description}`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    throw new Error(error.message);
  }
};
