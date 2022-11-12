export interface User {
    id: number
	username?: string
	displayName?: string
	dateJoin?: string
	email?: string | null
	phone?: string | null
	company?:string | null
	userAvatarUrl?: string | null
}