from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, CallbackContext

TOKEN = "7896677399:AAGTBCw_vrOXN9LCa_V3MPhF_c8vUb2Vwo8"

async def start(update: Update, context: CallbackContext) -> None:
    await update.message.reply_text("Hello! Send me a message, and I'll echo it back!")

async def echo(update: Update, context: CallbackContext) -> None:
    await update.message.reply_text(update.message.text)
    
    
async def dev(update: Update, context: CallbackContext) -> None:
    await update.message.reply_text("""
                                    🤖 **This Bot is developed by** [@swadhinbiswas](https://github.com/swadhinbiswas)  
💻 **Software Engineer | Open Source Enthusiast**  
🚀 **Founder of** [Boring Rats](https://github.com/BoringRats) – Empowering students through open-source!  
🛠 **Expert in:** Python, Django, DRF, React, TailwindCSS, Automation & IoT  
📧 **Contact:** [swadhinbiswas.dev@gmail.com](mailto:swadhinbiswas.dev@gmail.com)  
🌐 **Portfolio:** [Coming Soon!]  

                                    
                                    """)

def main():
    app = Application.builder().token(TOKEN).build()
    
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))

    print("Bot is running...")
    app.run_polling()

if __name__ == "__main__":
    main()
