import React from "react";



function Login(){
    return <>
   
   <div class="bg-[#dad7cd] min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center text-[#588157]">Log in here</h1>
                    <input 
                        type="text"
                        class="block border border-[#588157] w-full p-3 rounded mb-4"
                        name="fullname"
                        placeholder="Full Name" />

                    <input 
                        type="text"
                        class="block border border-[#588157] w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" />

                    <input 
                        type="password"
                        class="block border border-[#588157]  w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" />
                    

                    <button
                        type="submit"
                        class="w-full text-center py-3 hover:bg-[#3a5a40] rounded bg-[#588157] text-white hover:bg-green-dark focus:outline-none my-1"
                    >Create Account</button>
                </div>

                <div class="text-grey-dark mt-6">
                    Already have an account? 
                    <a class="no-underline border-b border-blue  text-blue" href="../login/">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
    
    </>
}
export default Login;