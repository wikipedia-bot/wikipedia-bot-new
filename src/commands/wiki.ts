import { CommandOptionType, SlashCreator, CommandContext, SlashCommand } from 'slash-create';
import { Command } from '../structures/';
import { Embed, getArticle } from '../utils';

export default class WikiCommand extends Command {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'wiki',
      description: 'The normal wiki command used for getting short summaries of something the user searched for.',
      options: [
        {
          type: CommandOptionType.STRING,
          name: 'search',
          description: 'What would you like to search?',
          required: true
        }
        // {
        //   type: CommandOptionType.STRING,
        //   name: 'language',
        //   description: 'Specify a language.',
        //   required: false,
        //   choices: [
        //     {
        //       name: 'de',
        //       value: 'de'
        //     }
        //   ]
        // }
      ]
    });
  }

  async run(ctx: CommandContext) {
    ctx.defer();

    const article = await getArticle(ctx.options.search);
    const wikiEmbed = new Embed()
      .setAuthor('Wikipedia Bot')
      .setDescription(article.summary)
      .setColor('0099ff')
      .setURL(article.url);

    if (article.image) wikiEmbed.setThumbnail(article.image);

    return {
      embeds: [wikiEmbed]
    };
  }
}