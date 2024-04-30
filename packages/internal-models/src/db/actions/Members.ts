import MemberSchema from '@/db/models/Member'

//Retrieves all members from the database
export async function getAllMembers() {
    const members = await MemberSchema.find({});
    return members;
}