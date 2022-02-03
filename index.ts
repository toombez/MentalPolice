import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client: Client = new Client({ intents: Intents.FLAGS.GUILD_MESSAGES });

client.on('ready', (client: Client) => {
    console.log(`${client.user?.username} ready`);
})

client.login(process.env.TOKEN);