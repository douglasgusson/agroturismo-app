import { RegisterForm } from "@/components/RegisterForm";

export default function Page() {
  return (
    <div className="container mx-auto max-w-7xl px-8 py-8 md:px-16">
      <div className="mx-auto max-w-md space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl">
          Cadastro
        </h1>
        <RegisterForm />
      </div>
    </div>
  );
}
