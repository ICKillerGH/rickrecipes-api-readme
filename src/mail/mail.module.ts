import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailService } from './mail.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    host: configService.get('MAIL_HOST'),
                    port: +configService.get('MAIL_PORT'),
                    secure: configService.get('MAIL_SECURE') === 'true',
                    auth: {
                        user: configService.get('MAIL_USER'),
                        pass: configService.get('MAIL_PASSWORD'),
                    },
                },
                defaults: {
                    from: `"No Reply" <${configService.get('MAIL_FROM')}>`,
                },
                template: {
                    dir: join(__dirname, '..', '..', '..', 'templates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
