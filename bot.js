process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
const mongoose = require("mongoose");
require('dotenv').config()
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
const Wine = require('./models/addwine.js')
const debug = require('./helpers.js')
const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true})
console.log('Started')

bot.on("polling_error", (msg) => console.log(msg));


bot.onText(/\/addwine/, msg => {
    const chatId = msg.chat.id
    let arr = msg.text.slice(9).split('\\')
    //console.log(arr)
    const newItem = new Wine({
        chatid: chatId,
        name: arr[0],
        description: arr[2],
        img: arr[4]
    })
    newItem.save().catch(err => console.log(err));
    bot.sendMessage(chatId, 'Success.')
})

bot.onText(/\/start/, msg => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, 'Hi! Nice to meet you.', {
        reply_markup: {
            keyboard: [
              ['Your Wine Today'],
              //['Catalog']
            ]}
    })
})

bot.on('message', msg => {
    const chatId = msg.chat.id
    //console.log(msg.text)

    if(msg.text == 'Your Wine Today') {
        Wine.find({
            chatid: 1148588142
          }).sort([
            ['_id', 'descending']
          ]).exec((err, res) => {
            if (err) console.log(err);

            let vinco = Math.floor(Math.random() * res.length) + 0
            if(res[vinco].img == undefined) bot.sendMessage(chatId, 'Error. Try again')
            bot.sendPhoto(chatId, `${res[vinco].img}`, {caption: `${res[vinco].name}\n${res[vinco].description}`})

          })
    }
    /*else if(msg.text == 'Catalog') {
        let str = ""
        Wine.find({
            chatid: 1148588142
          }).sort([
            ['_id', 'descending']
          ]).exec((err, res) => {
            if (err) console.log(err);
            for(i = 0; i < res.length; i++) {
                str = str + '\n' + res[i].name
            }
            bot.sendMessage(chatId, str, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: '⬅️',
                            callback_data: 'back'
                        },
                        {
                            text: '➡️',
                            callback_data: 'forward'
                        }]
                    ]
                }
            })
          })
    }*/
})
