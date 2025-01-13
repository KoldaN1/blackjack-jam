# Blackjack Telegram Bot

This is a simple Blackjack mini-game bot for Telegram, created in 3 hours for a mini-jam with friends. The game features modified rules and allows players to enjoy a round of Blackjack without any real money involved.

## Features
- Play a round of Blackjack with the bot
- Modified Blackjack rules
- No money or betting involved
- Commands: `/start`, `/play`, `/stop`, `/rules`

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/KoldaN1/blackjack-jam.git
   ```

2. Install dependencies:

   ```bash
   cd blackjack-jam
   npm install
   ```

3. Set up your Telegram bot token:
   - Create a bot on Telegram using the [BotFather](https://core.telegram.org/bots#botfather) and get your bot's token.
   - Create a `.env` file in the project root and add your token like this:

     ```
     BOT_TOKEN=your-bot-token-here
     ```

4. Run the bot (main file in ./src/bot/index.js):

   ```bash
   node .
   ```

## Commands

- `/start` – Starts the game and initializes the bot.
- `/play` – Begins a new game of Blackjack.
- `/stop` – Ends the current game.
- `/rules` – Displays rules of the game (not modified).

## License

This project is licensed under the MIT License.
