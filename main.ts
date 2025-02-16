/// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

/// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { WeatherModule } from './weather/weather.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), BotModule, WeatherModule, AuthModule],
})
export class AppModule {}

/// src/bot/bot.module.ts
import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { WeatherService } from '../weather/weather.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TelegrafModule.forRoot({ token: process.env.TELEGRAM_BOT_TOKEN })],
  providers: [BotService, WeatherService],
})
export class BotModule {}

/// src/bot/bot.service.ts
import { Injectable } from '@nestjs/common';
import { Ctx, Start, On, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { WeatherService } from '../weather/weather.service';

@Update()
@Injectable()
export class BotService {
  constructor(private readonly weatherService: WeatherService) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply('Welcome! Use /subscribe to get daily weather updates.');
  }

  @On('text')
  async onMessage(@Ctx() ctx: Context) {
    const city = ctx.message.text;
    const weather = await this.weatherService.getWeather(city);
    await ctx.reply(weather);
  }
}

/// src/weather/weather.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  async getWeather(city: string): Promise<string> {
    const API_KEY = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
      const response = await axios.get(url);
      const { main, weather } = response.data;
      return `🌤 Weather in ${city}: ${weather[0].description}, 🌡 Temp: ${main.temp}°C`;
    } catch (error) {
      return 'Sorry, I could not fetch the weather. Check the city name.';
    }
  }
}

/// src/auth/google.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const user = {
      email: profile.emails[0].value,
      name: profile.displayName,
      accessToken,
    };
    done(null, user);
  }
}

/// .env
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
WEATHER_API_KEY=your-openweathermap-api-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
