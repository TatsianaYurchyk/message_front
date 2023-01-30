export interface Mail {
    _id: string,
    userId:string,
    receiver:string,
    title: string,
    text?: string,
    createdAt: string,
    // updatedAt: string,
}