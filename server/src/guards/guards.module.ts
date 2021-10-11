import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupSchema } from '../models/group.schema';
import { GuardsService } from './guards.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]),
  ],
  providers: [GuardsService],
  exports: [GuardsService],
})
export class GuardsModule {}
