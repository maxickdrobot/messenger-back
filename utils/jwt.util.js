import jwt from "jsonwebtoken";

export function generateEmailToken(userId) {
  console.log(process.env.EMAIL_VERIFY_SECRET);

  try {
    return jwt.sign({ userId }, process.env.EMAIL_VERIFY_SECRET, { expiresIn: "24h" });
  } catch (error) {
    console.error("JWT email token generation failed:", error);
    throw new Error("EMAIL_TOKEN_GENERATION_FAILED");
  }
}
