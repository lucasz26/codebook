import { handleSignOut } from "@/lib/auth-actions";
import Button from "@/components/Button";

export default function SignOut() {
  return (
    <Button type="submit" text="Sign Out" onClick={handleSignOut} />
  );
}
