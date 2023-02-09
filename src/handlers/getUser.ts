import {ObjectId} from "mongodb";
import {MiddlewareHandler, Response} from "yet-another-http/dist";
import {$db} from "../helpers/makeDb";

const handler: MiddlewareHandler = async(request) => {

  const userId = request.queryParams.userId;

  if(typeof userId !== "string" || !ObjectId.isValid(userId)) {
    return new Response(400, "Can't parse userId");
  }

  // Prepare client data
  const $userId = new ObjectId(userId);

  // Get user data from DB
  const user = await $db.users.findOne({_id: $userId});
  if(!user) {
    return new Response(404, "User not found");
  }

  // Send user data
  return new Response(200, user as object);
};

export default handler;
