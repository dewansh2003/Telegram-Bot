# Telegram-Bot


# Telegram Bot with NestJS

This project is a Telegram bot built using **NestJS** that provides daily weather updates and includes an admin panel with Google Login authentication.

## Features
✅ Users can subscribe to receive daily weather updates.
✅ Admin panel with Google Login authentication.
✅ Admins can manage bot settings (e.g., API keys) and handle user accounts (e.g., blocking, deleting users).

---

## Installation

### Prerequisites
- Node.js installed
- NestJS CLI installed (`npm install -g @nestjs/cli`)
- OpenWeatherMap API key
- Telegram Bot token from BotFather
- Google OAuth credentials

### Steps to Run
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/telegram-bot-nestjs.git
   cd telegram-bot-nestjs
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your credentials:
   ```env
   TELEGRAM_BOT_TOKEN=your-telegram-bot-token
   WEATHER_API_KEY=your-openweathermap-api-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. Run the application:
   ```sh
   npm run start
   ```

---

## Project Structure
```plaintext
src/
├── app.module.ts
├── main.ts
├── bot/
│   ├── bot.module.ts
│   ├── bot.service.ts
├── weather/
│   ├── weather.service.ts
├── auth/
│   ├── google.strategy.ts
```

---

## API Usage
- Start the bot and interact with it using `/start`.
- Send a city name to get the weather update.
- Admins can log in using Google OAuth.

---

## Deployment
To deploy on a cloud service like **Heroku, Vercel, or AWS**, ensure you set up environment variables properly.

---

## Contributing
Feel free to fork this repo and submit pull requests! 🚀

---

## License
This project is licensed under the MIT License.
