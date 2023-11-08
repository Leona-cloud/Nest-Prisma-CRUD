import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers';
import { AuthService } from './services';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: 'mySecret',
            signOptions: {expiresIn: '1h'}
        })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
