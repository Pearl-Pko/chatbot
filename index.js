const {autoResponse} = require('./autoResponse');
const {userResponse} = require('./userResponse');

const write = (str) => process.stdout.write(str);

const chat = () => {
    chatHistory = []

    while (true)
    {
        const userResponseText = userResponse(chatHistory);
        // write("User: ");
        // write(userResponseText);
        // write('\n');

        write("AI: ")
        const autoResponseText = autoResponse(chatHistory, userResponseText);
        write(autoResponseText);
        write('\n');
        
        chatHistory.push(4);

        // history.push()

        // console.log(`You are ${age} years old.`);

    }

}

chat();