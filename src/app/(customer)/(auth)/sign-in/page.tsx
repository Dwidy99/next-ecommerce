import React from "react";

export default function SignInPage() {
  return (
    <div
      id="signin"
      className="bg-[#EFF3FA] min-h-screen pt-[30px] pb-[50px] flex flex-col"
    >
      <div className="container max-w-[1130px] mx-auto flex flex-1 items-center justify-center py-5">
        <form
          action="index.html"
          className="w-[500px] bg-white p-[50px_30px] flex flex-col gap-5 rounded-3xl border border-[#E5E5E5]"
        >
          <div className="flex justify-center">
            <img src="assets/logos/logo-black.svg" alt="logo" />
          </div>
          <h1 className="font-bold text-2xl leading-[34px]">Sign In</h1>
          <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
            <div className="flex shrink-0">
              <img src="assets/icons/sms.svg" alt="icon" />
            </div>
            <input
              type="email"
              id=""
              name=""
              className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
              placeholder="Write your email address"
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
              <div className="flex shrink-0">
                <img src="assets/icons/lock.svg" alt="icon" />
              </div>
              <input
                type="password"
                id="password"
                name=""
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                placeholder="Write your password"
              />
              <button
                type="button"
                className="reveal-password flex shrink-0"
                // onlick={togglePasswordVisibility("password", this)}
              >
                <img src="assets/icons/eye.svg" alt="icon" />
              </button>
            </div>
            <a
              href=""
              className="text-sm text-[#616369] underline w-fit mr-0 ml-auto"
            >
              Forgot Password
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="p-[12px_24px] bg-[#0D5CD7] rounded-full text-center font-semibold text-white"
            >
              Sign In to My Account
            </button>
            <a
              href="signup.html"
              className="p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5]"
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
