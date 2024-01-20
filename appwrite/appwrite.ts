import { Account, Client, Databases } from "appwrite";
import { APPWRITE_PROJECT, APPWRITE_URL } from "./appwrite.constants";

const client = new Client();

client.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

export const account = new Account(client);

export const db = new Databases(client);


export { ID } from "appwrite";