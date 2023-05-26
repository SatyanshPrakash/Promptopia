import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";


export const GET = async(req, { params }) => {
    try{
        await connectToDB();
        const searchQuery = params.searchQuery;
        const objId = await User.findOne({ username: { $regex: searchQuery }});
        const prompts = await Prompt.find({ $or: [ { creator: objId?._id }, { tag: { $regex: searchQuery.replaceAll("-", "#") }}]}).populate('creator');
        return new Response(JSON.stringify(prompts), { status: 200 });
    }catch(error) {
        console.log(error);
        return new Response('Failed to Fetch search data!', { status: 500 });
    }
    
}