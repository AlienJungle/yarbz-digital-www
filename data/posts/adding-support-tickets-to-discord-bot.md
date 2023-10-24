---
title: Adding support ticket functionality to a Discord bot
type: blog
image: /blog-images/discord.jpg
date: Mon Oct 11 2021 14:15:09 GMT+0100 (British Summer Time)
excerpt: Find out how to add threads to your Discord bot.
---

Support tickets are a great way to deal with server issues. They can be made visible to multiple staff members or specific roles, they provide a straight-forward and official avenue to report server issues and communicate with staff members, and they also keep users out of staff DMs!

I spent a few hours adding them to my language learning Discord bot, Babel, and was surprised at how easy it was.

**Note:** my bot uses the [Discord.NET](https://github.com/discord-net/Discord.Net) library, and the bot is built with C# and dotnet core, though you can apply this logic to whichever library you use.

## Features

This article describes how to add tickets that offer:

- opening tickets via reactions
- closing tickets via reactions
- creating private channels visible only to the user and those you've configured to see ticket channels

## Outline

In total, the ticketing functionality consists of the following parts:

- **TicketService** for offering the core ticket functionality
- **TicketHandler** for listening and responding to Discord.NET events

## Writing the ticket service

The ticket service will provide us with the core functionality for opening and closing tickets, as well as a few methods we can use to check if a user has a ticket already, and if a given channel is actually a ticket channel.

The ticket service consists of a class and an interface. The interface defines the following members:

```c#
public interface ITicketService
{
    /// <summary>
    /// Closes the user's open ticket (if they have one open)
    /// </summary>
    Task CloseTicketAsync(IGuild guild, ulong userId);

    /// <summary>
    /// Closes a user's ticket based on a given ticket channel.
    /// If the given channel is not a ticket channel, then an ArgumentException is thrown.
    /// </summary>
    Task CloseTicketAsync(IGuildChannel channel);

    /// <summary>
    /// Creates a ticket for a user.
    /// </summary>
    /// <returns></returns>
    Task CreateTicketAsync(IGuild guild, ulong forUserId);

    /// <summary>
    /// Checks if a user has a ticket. If yes, returns true.
    /// </summary>
    Task<bool> DoesUserHaveTicketAsync(IGuild guild, ulong userId);

    /// <summary>
    /// Checks if a channel is a ticket channel.
    /// </summary>
    bool IsTicketChannel(IChannel channel);
}
```

### Creating a ticket

The code for creating a ticket needs to:

- check that the user doesn't already have a ticket
- create the ticket channel in the correct category (as the category permissions will hide ticket channels from regular users)
- give the creator permission to see their own ticket
- send a short informational message to the ticket channel
- add the 🔒 emoji to the message, which will close the ticket if clicked

```c#
private const string TicketChannelNamePrefix = "ticket-";

public async Task CreateTicketAsync(IGuild guild, ulong forUserId)
{
    const ulong TICKET_CHANNEL_CATEGORY_ID = 205011892434368993;

    if (await DoesUserHaveTicketAsync(guild, forUserId))
        throw new InvalidOperationException("User already has a thread.");

    ITextChannel channel = await guild.CreateTextChannelAsync(GetTicketChannelName(forUserId), props =>
    {
        props.CategoryId = TICKET_CHANNEL_CATEGORY_ID;
    });

    IUser user = await _discordClient.GetUserAsync(forUserId);

    await channel.AddPermissionOverwriteAsync(user, new OverwritePermissions(
        viewChannel: PermValue.Allow));

    IUserMessage introMessage = await channel.SendMessageAsync("[your intro message]");
    await introMessage.AddReactionAsync(new Emoji("🔒"));
}

public async Task<bool> DoesUserHaveTicketAsync(IGuild guild, ulong userId)
    => (await guild.GetChannelsAsync()).Any(x => x.Name == GetTicketChannelName(userId));

string GetTicketChannelName(ulong userId) => $"{TicketChannelNamePrefix}{userId}";
```

As a simple method of checking if a user already has a ticket, we can loop through a guild's channels and count any channels with a specific prefix as a ticket channel.

### Closing a ticket

Now that we can create a ticket, we can define the logic for closing a ticket. To do this, we must:

- check if a user has an open ticket channel
- if so, delete the channel

```c#
public async Task CloseTicketAsync(IGuild guild, ulong userId)
{
    ITextChannel? channel = await GetTicketChannelForUser(guild, userId);
    if (channel is not null)
        await channel.DeleteAsync();
}

async Task<ITextChannel?> GetTicketChannelForUser(IGuild guild, ulong userId)
    => (ITextChannel?)(await guild.GetChannelsAsync())
        .FirstOrDefault(x => x.Name == GetTicketChannelName(userId));

```

Again, as a simple check to grab a user's ticket channel, since the user ID is used in every ticket channel name, we can check if any channels exist with the defined ticket channel prefix, followed by the user's ID.

## Writing the ticket handler

The ticket handler's job is to hook onto relevant Discord events and do something with them. In our case, we need to hook onto the reaction event to close a ticket.

There are two specific scnearios we need to deal with:

- A user reacts with a padlock emoji 🔒 within the ticket channel and the ticket channel is closed.
- A user reacts to a specific message with the envelope emoji ✉️ and a new ticket is created.

Using the functionality exposed by the ticket service we created before, this is fairly straight-forward:

```c#
private const ulong TICKET_CREATION_MESSAGE_ID = 4893573495345;

public async Task OnReactionAdded(
    Cacheable<IUserMessage, ulong> cachedMessage,
    ISocketMessageChannel originChannel,
    SocketReaction reaction)
{
    IUserMessage message = await cachedMessage.DownloadAsync();

    if (!reaction.User.IsSpecified || reaction.User.Value.IsBot)
        return;

    var guildChannel = originChannel as IGuildChannel;
    if (guildChannel is null)
        return;

    if (reaction.Emote.Name == "🔒" && _ticketService.IsTicketChannel(originChannel))
    {
        await _ticketService.CloseTicketAsync(guildChannel);
    }
    else if (
        reaction.Emote.Name == "✉️"
        && message.Id == TICKET_CREATION_MESSAGE_ID)
    {
        if (await _ticketService.DoesUserHaveTicketAsync(guildChannel.Guild, reaction.UserId))
            return;

        await _ticketService.CreateTicketAsync(guildChannel.Guild, reaction.UserId);
        await message.RemoveReactionAsync(reaction.Emote, reaction.User.Value);
    }
}

public void Register()
{
    var socketClient = (DiscordSocketClient)_discordClient;
    socketClient.ReactionAdded += OnReactionAdded;
}
```

Now all we need to do isinject/create an instance of TicketHandler somewhere, and call the `Register()` method to bind our event listeners.
