export interface Mail {
    _id: string,
    receiver:string,
    userId:string,
    title: string,
    text?: string,
    createdAt: string,
    updatedAt: string,
}