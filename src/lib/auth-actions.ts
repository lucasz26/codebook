"use server";

import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function handleSignIn() {
  try {
    await signIn("google");
  } catch (error) {
    throw error;
  }
}

export async function handleSignOut() {
    await signOut({ redirect: false });
    
    redirect("/"); 
  }
