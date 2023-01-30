import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { Mail } from "../models/mail";
import { User } from "../models/user";

const USER_API_URL = "https://message-mern-api.onrender.com";
// const USER_API_URL = "http://localhost:3000";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
        }
    }
}

export async function fetchMails(): Promise<Mail[]> {

    const response = await fetchData(`${USER_API_URL}/api/mails`, { method: "GET" });
    return response.json();
}

export interface MailInput {
    receiver: string,
    title: string,
    text?: string,
}

export async function createMail(mail: MailInput): Promise<Mail> {
    const response = await fetchData(`${USER_API_URL}/api/mails/create`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mail),
        });
    return response.json();
}

