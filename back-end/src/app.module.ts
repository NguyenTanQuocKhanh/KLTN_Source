import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import appConfig from './config/app.config';
import mailConfig from './config/mail.config';
import fileConfig from './config/file.config';
import facebookConfig from './config/facebook.config';
import googleConfig from './config/google.config';
import * as path from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthFacebookModule } from './auth-facebook/auth-facebook.module';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { HeaderResolver } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { MailConfigService } from './mail/mail-config.service';
import { ForgotModule } from './forgot/forgot.module';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { DataSource } from 'typeorm';
import { BannerModule } from './banner/banner.module';
import { SharedModule } from './shared/shared.module';
import { BrandModule } from './brand/brand.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductModule } from './product/product.module';
import { ModelModule } from './model/model.module';
import { TierModelModule } from './tier-model/tier-model.module';
import { StripeModule } from './payments/stripe/stripe.module';
import { OrdersModule } from './orders/orders.module';
import { ReviewModule } from './review/review.module';
import { MomoModule } from './payments/momo/momo.module';
import momoConfig from './config/momo.config';
import { CartModule } from './cart/cart.module';
import { AddressModule } from './address/address.module';
import { CashModule } from './payments/cash/cash.module';
import { StatisticalModule } from './statistical/statistical.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        mailConfig,
        fileConfig,
        facebookConfig,
        googleConfig,
        momoConfig,
      ],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.get('app.fallbackLanguage'),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService) => {
            return configService.get('app.headerLanguage');
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    AuthFacebookModule,
    AuthGoogleModule,
    ForgotModule,
    MailModule,
    HomeModule,
    BannerModule,
    SharedModule,
    BrandModule,
    CategoriesModule,
    ProductModule,
    ModelModule,
    TierModelModule,
    StripeModule,
    MomoModule,
    OrdersModule,
    CashModule,
    ReviewModule,
    CartModule,
    AddressModule,
    StatisticalModule,
  ],
})
export class AppModule {}
