import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ClientsModule } from './clients/clients.module';
import { ProjectsModule } from './projects/projects.module';
import { InteractionsModule } from './interactions/interactions.module';
import { RemindersModule } from './reminders/reminders.module';
import { CleanupService } from './common/services/cleanup.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    DashboardModule,
    ClientsModule,
    ProjectsModule,
    InteractionsModule,
    RemindersModule,
  ],
  controllers: [AppController],
  providers: [CleanupService],
})
export class AppModule {}
