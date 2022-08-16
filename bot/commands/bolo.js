const { Client, MessageEmbed, MessageAttachment, AttachmentBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
                .setName('bolo')
                .setDescription('BE ON THE LOOKOUT! (URL or attachment required)')
                  .addStringOption((option) => option.setName('user').setDescription('Username of offender.').setRequired(true))
                  .addStringOption((option) => option.setName('reason').setDescription('Reason for the BOLO.').setRequired(true))
                  .addStringOption((option) => option.setName('url').setDescription('URL to the screenshot of the offensive content. (Limited to 1)').setRequired(false))
                  .addAttachmentOption((option) => option.setName('attachment').setDescription('Screenshot of the offensive content. (Limited to 1)').setRequired(false)),

        async execute(interaction, client) {

        const attachment = interaction.options.getAttachment('attachment');
        const user = interaction.options.getString('user');
        const reason = interaction.options.getString('reason');
        const image = (interaction.options.getString('url') !== null) ? interaction.options.getString('url') : attachment.url;

        const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle('** BE ON THE LOOKOUT **')
        .addField('Username:', user)
        .addField('Reason:', reason)
        .setImage(`${image}`)

        let msgEmbed = await interaction.reply({embeds: [embed]});

        },
};