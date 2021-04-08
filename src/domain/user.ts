export default interface User {
    name: string
    discord: DiscordInfo
}

type DiscordInfo = {
    id: string
    username: string
}
