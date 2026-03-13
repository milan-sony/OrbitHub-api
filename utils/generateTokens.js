import jwt from "jsonwebtoken"

// Access token for authorization header
export const generateAccessToken = (userId) => {
    try {
        const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET_ACCESS_TOKEN, {
            expiresIn: "15m"
        })

        return accessToken

    } catch (error) {
        console.error("Error generating the access token, ", error)
    }
}