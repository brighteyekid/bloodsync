declare module '@huggingface/inference' {
    export class HfInference {
        constructor(token: string);
        chatCompletion(params: {
            model: string;
            messages: Array<{
                role: string;
                content: string;
            }>;
            provider?: string;
            max_tokens?: number;
        }): Promise<{
            choices: Array<{
                message: {
                    content: string;
                };
            }>;
        }>;
    }
} 