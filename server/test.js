process.noDeprecation = true;

const puppeteer = require('puppeteer');
const OpenAI = require('openai');

const openai = new OpenAI();

async function generate_keywords(prompt) {

    const systemMessage = 'You are a Keyword/Search_phrases Bot. You are helping a user find the best learning path for a given request he wants to learn. They want to know the best resources to learn about this topic. They want to know the best tutorials and videos to watch. They want to know the best phrases to search for. They want to know the best learning path for the given topic on Youtube, the generated phrases or search_keywords should be in sequence and different from each other vastly to cover the entire depth of the topic as asked by the user. Generate Strictly 5 phrases only in an array separated by commas, give nothing else in response other than the array}';

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: [
            { "role": "system", "content": systemMessage },
            { "role": "user", "content": `The User's Request is: ${prompt}` },
        ],
        max_tokens: 200,
        seed: 2323,
    });

    const response = completion.choices[0].message.content;
    console.log(response);
    console.log('-----------------');
    const learningKeywords = JSON.parse(response);

    console.log(learningKeywords);

    // Use the generated array instead of the hardcoded array
    const result = await getTopVideoUrlsForKeywords(learningKeywords);

    const jsonResult = JSON.stringify(result, null, 2);
    console.log(jsonResult)
    return jsonResult;
}

async function getTopVideoUrlsForKeywords(keywords) {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Added args to prevent sandbox issues
    });
    const page = await browser.newPage();

    const result = [];

    for (const keyword of keywords) {
        const url = `https://www.youtube.com/results?q=${encodeURIComponent(keyword)}`;
        
        try {
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 }); // Set timeout to 0 for no timeout

            // Wait for the results to load
            await page.waitForSelector('ytd-video-renderer', { timeout: 0 });

            // Extract the top video URL
            const topVideoUrl = await page.evaluate(() => {
                const videoElement = document.querySelector('ytd-video-renderer');
                const titleElement = videoElement.querySelector('#video-title');

                return `https://www.youtube.com${titleElement.getAttribute('href')}`;
            });

            result.push(topVideoUrl);
        } catch (error) {
            console.error(`Error navigating to ${url}: ${error.message}`);
        }
    }

    await browser.close();
    return result;
}


module.exports = { generate_keywords }