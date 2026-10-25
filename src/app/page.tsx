import Cover from "@/components/sections/cover";
import LoginForm from "../components/auth/login-form";
export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-base-background)]w-[512px] h-[300px]">
      <Cover />

      <main className="min-h-screen bg-black p-8 text-white">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 xl:grid-cols-4">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-lg font-semibold">Init — Login awal</h2>
            <LoginForm variant="login-awal" />
          </div>

          <div className="flex flex-col items-center gap-4">
            <h2 className="text-lg font-semibold">Error</h2>
            <LoginForm variant="error" />
          </div>

          <div className="flex flex-col items-center gap-4">
            <h2 className="text-lg font-semibold">Fill</h2>
            <LoginForm variant="fill" />
          </div>

          <div className="flex flex-col items-center gap-4">
            <h2 className="text-lg font-semibold">Login</h2>
            <LoginForm variant="login" />
          </div>
        </div>
      </main>
    </main>
  );
}
