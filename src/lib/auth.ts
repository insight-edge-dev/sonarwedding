import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
const secret = new TextEncoder().encode(process.env.SESSION_SECRET ?? "development-only-change-me-before-production");
type Role = "ADMIN" | "CLIENT";
export async function createSession(userId:string, role:Role){return new SignJWT({role}).setProtectedHeader({alg:"HS256"}).setSubject(userId).setIssuedAt().setExpirationTime("8h").sign(secret)}
export async function currentSession(){const token=(await cookies()).get("sa_session")?.value;if(!token)return null;try{const {payload}=await jwtVerify(token,secret);return {userId:payload.sub!,role:payload.role as Role}}catch{return null}}
export async function requireRole(...roles:Role[]){const session=await currentSession();if(!session||!roles.includes(session.role))throw new Error("Unauthorized");return session}
