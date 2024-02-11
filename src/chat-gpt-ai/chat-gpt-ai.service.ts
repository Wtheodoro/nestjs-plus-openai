import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';

const DEFAULT_MODEL_ID = 'gpt-3.5-turbo';
const DEFAULT_TEMPERATURE = 0.9;

@Injectable()
export class ChatGptAiService {
  private readonly openAiApi;
  private selectedModelId: string | undefined;

  constructor() {
    const openai = new OpenAI({
      organization: process.env.ORGANIZATION_ID,
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.openAiApi = openai;
  }

  setModelId(modelId: string) {
    this.selectedModelId = modelId;
  }

  listModels = async () => {
    // TODO update list models method
    const models = await this.openAiApi.listModels();
    return models;
  };

  getModelAnswer = async (question: string, temperature?: number) => {
    try {
      const params = {
        model: this.selectedModelId ? this.selectedModelId : DEFAULT_MODEL_ID,
        messages: [{ role: 'user', content: question }],
        temperature:
          temperature !== undefined ? temperature : DEFAULT_TEMPERATURE,
      };

      const response = await this.openAiApi.chat.completions.create(params);
      console.log('heere', response);

      if (response?.choices.length) {
        return response.choices;
      }
    } catch (error) {
      console.error('Erro ao executar a solicitação de AI:', error);
      throw error;
    }
  };
}
