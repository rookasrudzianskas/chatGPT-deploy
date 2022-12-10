import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    const { priceMin, priceMax, gender, age, hobbies } = req.body;
    // console.log(priceMin, priceMax, gender, age, hobbies);
    const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: generatePrompt(priceMin, priceMax, gender, age, hobbies),
        temperature: 0.6,
        // maxTokens: 2048 this is max number of tokens,
        max_tokens: 2048,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
}
function generatePrompt(priceMin, priceMax, gender, age, hobbies) {
    return `suggest 3 Christmas gift ideas between ${priceMin}$ and ${priceMax}$ for a ${age} years old ${gender} who is into ${hobbies}.`;
}
