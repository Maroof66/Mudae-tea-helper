const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const { YellowTea, BlackTea, RedTea } = require("./functions.js");
const dotenv = require("dotenv");
dotenv.config();
const config = require("./config.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
    if (
        message.guild.id !== config.serverID ||
        message.author.id !== config.MudaeID
    )
        return;

    const patterns = [
        { key: "Type as many words as", func: YellowTea, color: "#FBE345" },
        { key: "Type a word", func: BlackTea, color: "#4B3522" },
        {
            key: "Quickly type a word containing",
            func: BlackTea,
            color: "#77B065",
        },
        {
            key: "Type the longest word containing",
            func: RedTea,
            color: "#800000",
        },
    ];

    const pattern = patterns.find((p) => message.content.includes(p.key));
    if (!pattern) return;

    const teaPattern = message.content.split("*")[2];
    const teaList = pattern.func(teaPattern);
    if (teaList)
        await sendAndDeleteEmbeds(message.channel, teaList, pattern.color);
});

const sendAndDeleteEmbeds = async (channel, arr, color) => {
    const embeds = arr
        .slice(0, 5)
        .map((item) => new EmbedBuilder().setDescription(item).setColor(color));

    const sentMessage = await channel.send({ embeds });
    setTimeout(() => sentMessage.delete().catch(console.error), 11000);
};

client.login(process.env.token);
