import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatGptAiService } from './chat-gpt-ai.service';
import { GetAiModelAnswer } from './model/get-ai-model-answer';

@Controller('chat-gpt-ai')
export class ChatGptAiController {
  constructor(private readonly service: ChatGptAiService) {}

  @Post('/message')
  getModelAnswer(@Body() data: GetAiModelAnswer) {
    return this.service.getModelAnswer(data.question);
  }

  @Get('/models')
  listModels() {
    return this.service.listModels();
  }
}
