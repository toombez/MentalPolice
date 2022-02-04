import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
import GraphemeSplitter from 'grapheme-splitter';

dotenv.config();

const client: Client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS] });

client.on('ready', (client: Client) => {
    console.log(`${client.user?.username} ready`);
})

client.on('messageCreate', (message) => {
    if (message.channelId !== process.env.VOTING_CHANNEL_ID) return;

    const splitter = new GraphemeSplitter();
    message.content.split('\n').forEach(row => {
        const splittedRow = splitter.splitGraphemes(row);
        const rowEmoji = splittedRow.join().match(/\p{Emoji}+/gu);
        if (!rowEmoji || !Number.isNaN(+rowEmoji)) return;

        message.react(rowEmoji[0])
    })
})

client.login(process.env.TOKEN);