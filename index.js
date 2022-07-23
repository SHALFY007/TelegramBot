const {
    Telegraf,
    Markup
} = require('telegraf')
require('dotenv').config()
const text = require('./const')
const goods = require('./good')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start(async (ctx) => await ctx.replyWithHTML(`<b>Привет, ${ctx.message.from.first_name
    ? ctx.message.from.first_name
    : 'друг'}, добро пожаловать в наш бот-магазин!\nВыберете товар\nРаботаем только по Москве!</b>`, Markup.inlineKeyboard(
        [
            [Markup.button.callback('ПОДЫ', 'pods'), Markup.button.callback('ЖИДКОСТИ', 'zhiz')],
            [Markup.button.callback('ОДНОРАЗКИ', 'odnoraz')]
        ]
    )))
bot.help((ctx) => ctx.reply(text.commands))
bot.command('pay', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>PAY</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Text', 'btn-1')]
            ]
        ))
    } catch (error) {
        console.error(error)
    }
})

function addGood(name, id) {
    return good = [Markup.button.callback(name, id)]
}


bot.action('pods', async (ctx) => {
    try {
        await ctx.answerCbQuery
        await ctx.replyWithHTML('<b>ДОСТУПНЫЕ ПОДЫ</b>', Markup.inlineKeyboard([
            addGood('JULL', 'juul'),
            addGood('Aegis', 'aegis')
        ])
        )
    } catch (error) {

    }
})
bot.action('btn-1', async (ctx) => {
    try {
        await ctx.answerCbQuery()
        await ctx.replyWithHTML('<b>1</b>', {
            disable_web_page_preview: true
        })
    } catch (e) {
        console.error(e)
    }
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))