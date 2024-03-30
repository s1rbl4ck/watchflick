import { verifyToken } from "@/lib/utils";

const useUserInfo = async (prop) => {
    const token = prop.req ? prop.req?.cookies.token : null;
    const userId = await verifyToken(token);

    return {
        userId,
        token
    }
}

export default useUserInfo;