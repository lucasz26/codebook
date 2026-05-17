"use server";

import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { fakeUsers } from "@/lib/data";
import { revalidatePath } from "next/cache";


// OAuth Functions
export async function handleSignIn() {
  try {
    await signIn("google");
  } catch (error) {
    throw error;
  }
}

// Credential Functions -- DB REPLACE
export async function getUserByEmail(email: string) {
  return fakeUsers.find((user) => user.email === email);
};

export async function handleSignOut() {
  await signOut({ redirect: false });

  redirect("/");
  // Sorry, there's a lot of redirect("/").
  // It's to force reloads when signing out to ensure we drop the profile picture.
}

export async function syncOAuth(oauthId: string, email: string, name: string) {
  // Parse, search by OAuthID.
  // If they exist, update their name if required.

  // If they don't exist, let's add their account.
  // Do they have an existing credentials account?

  // No : Let's create this account and push in the oAuthId as their secondary ID.
  // Yes : We can go ahead and add this user to the credentials account.
}

export async function credentialLogIn(email: string, password: string) {
    try {
        await signIn("credentials", {
            email: email,
            password: password,
            redirect: false, // We handle the redirect on the client
        });

        return { success: true };
    } catch (error: any) {

        // Redirects are considered errors. We want to redirect, so no worries on this end.
        if (error.message?.includes("NEXT_REDIRECT")) {
            return { success: true };
        }
        
        console.error("Auth Error:", error.message);
        return { error: "Invalid credentials." };
    }
}

export async function registerAndLogin(email: string, password: string) {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return await credentialLogIn(email, password); 
    }

    const newUser = {
        id: fakeUsers.length + 1,
        email: email,
        password: password,
        name: email.split('@')[0],
    };

    fakeUsers.push(newUser);
    console.log("User registered on server:", newUser);

    // Now log in the newly created user
    return await credentialLogIn(email, password);
}