
module.exports = {
  onBan: (channel, username, botconfig, bot) => {
    var logChannel = bot.channels.cache.find(c => c.name === botconfig.logChannel)
    var chn = channel.slice(1);//Remove the # from the twitch channel name
    
    //Log the banned user in discord
    return logChannel.send("**" + username + "** was banned in **" + chn + "**");
  },

  onTimeout: (channel, username, duration, botconfig, bot) => {
    var logChannel = bot.channels.cache.find(c => c.name === botconfig.logChannel)
    var chn = channel.slice(1);//Remove the # from the twitch channel name
    
    //Log the timed out user in discord
    var durationFormat = "";
    if(duration >= 86400) durationFormat += Math.floor(duration/86400) + " days ";
    if(duration >= 3600) durationFormat +=  Math.floor((duration%86400)/3600) + " hours ";
    if(duration >= 60) durationFormat += Math.floor((duration%3600)/60) + " minutes ";
    durationFormat += duration%60 + " seconds"
    
    return logChannel.send("**" + username + "** was timed out in **" + chn + "** for " + durationFormat);
  },

  onDisconnect: (options) => {
  },


  onConnect: (options) => {
    
    var conChannels = options.channels.length;
    console.log(`Connected to [${conChannels}] Twitch channels.`);//Log the amount of channels connected in console
  }
}