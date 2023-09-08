module.exports= async (msg)=>{
    const user = msg.mentions.users.first() || msg.author;

    const avatar = {
        description: `Avatar de ${user.username}`,
        image: {url: user.displayAvatarURL({dynamic: true, size: 1024})}
    }

    msg.reply({embeds:[avatar]})
};