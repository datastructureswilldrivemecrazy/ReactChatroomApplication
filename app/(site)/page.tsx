import Image from "next/image"
import AuthForm from "./components/AuthForm"
export default function Home() {
    return (
      <div className="
      flex
      min-h-full
      flex-col
      justify-center
      py-12
      sm:px-6
      lg:px-8
      bg-stone-200
      ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image
            alt="Logo"
            height="120"
            width="120"
            className="mx-auto w-auto"
            src="/images/logo.png"
            />

            <h2 className="
            mt-6
            text-center
            text-2xl
            font-bold
            tracking-tight
            text-stone-700
            ">
                Transmit - Where Your Words Resonate.
            </h2>

            <h3 className="
            mt-6
            text-center
            text-xl
            font-bold
            tracking-tight
            text-stone-700
            ">
                Sign in to your account.
            </h3>
      </div>
      <AuthForm />
      </div>
    )
  }
  