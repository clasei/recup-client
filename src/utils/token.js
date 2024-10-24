import jwt_decode from "jwt-decode"

export const tokenPayload = (token) => {
  if (!token) return null
  try {
    return jwt_decode(token)
  } catch (error) {
    console.error("Error decoding token", error)
    return null
  }
}
