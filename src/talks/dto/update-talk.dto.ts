import { CreateTalkDto } from './create-talk.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTalkDto extends PartialType(CreateTalkDto) {}
