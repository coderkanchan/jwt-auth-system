import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

 const handler = NextAuth({
  providers : [
    
  ]
 })

export {handler as GET, handler as POST };