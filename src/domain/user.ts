export default interface User {
    name: string
    discord: DiscordInfo
    role: string
}

type DiscordInfo = {
    id: string
    username: string
}
