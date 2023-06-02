import { LoginForm } from "@/components/LoginForm";

export default async function Page() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="max-w-xs mx-auto">
        <LoginForm />
      </div>
    </div>
  );
}
