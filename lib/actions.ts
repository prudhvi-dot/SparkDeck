"use server"

import Startup from "@/models/Startup";
import connectDB from "./ConnectDB";

import { auth } from "@/auth"
import Author from "@/models/Author";

export const createStartup = async (form: FormData, content: string) => {
    const session = await auth();

    if(!session) {
        return JSON.parse(JSON.stringify({error: "Not signed in", status: "ERROR"}));
    }
    const {title, description, category, link} = Object.fromEntries(
            Array.from(form).filter(([key])=>key!='content')
        )

    try {
        await connectDB();
        const newStartup = await Startup.create({
            title,
            description,
            author:session.user.id,
            category,
            image:link,
            content
        })

        return JSON.parse(JSON.stringify({...newStartup,error:"",status:"SUCCESS"}))
    } catch (error) {
        console.log(error)
        return JSON.parse(JSON.stringify({error: "Error Creating Startup", status: "ERROR"}));
    }
}

export const fetchUser = async(id:string)=> {
    try {
        await connectDB();
        const user = await Author.findOne({_id:id});

        if(!user) {
            return JSON.parse(JSON.stringify({error: "User not found", status: "ERROR"}));
        }

        return JSON.parse(JSON.stringify({...user, status: "ERROR"}));
    } catch (error) {
        console.log(error)
        return JSON.parse(JSON.stringify({error: "Error Fetching User", status: "ERROR"}));
    }
}