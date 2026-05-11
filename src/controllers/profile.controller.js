import { getProfileService } from "../services/profile.service.js"

export const getProfileController = async (req,res) => {
    try {
        
        // const profile = await getProfileService(
        //     req.params.id
        // );

        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                error:"Invalid ID"
            })
        }

        const profile = 
            await getProfileService(id);
        
        return res.status(200).json(
            profile
        );
    } catch (error) {
        
        return res.status(500).json({
            error:error.message
        })
    }
}