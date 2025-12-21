import { redirect } from "next/navigation";

export default function RedirectToGoogle() {
    return redirect("https://google.com");
}
