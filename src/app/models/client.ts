export interface Client {
    id?: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    balance: number,
    city?: string,
    subscribe?: boolean,
    contact?: object,
    active?: boolean,
    clientId?: string
}
