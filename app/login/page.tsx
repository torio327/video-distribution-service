
import {login, signup} from "@/app/login/actions";


const Page = () => {

    return (
        <>
         {/*<form className={"flex flex-col"} >*/}
         {/*    <label htmlFor={"email"}>Email:</label>*/}
         {/*    <input id={"email"} onChange={(e)=>setUser({...user,email: e.target.value})} name={"email"} type={"email"}*/}
         {/*           value={user.email} required/>*/}
         {/*    <label htmlFor={"password"}>Password:</label>*/}
         {/*    <input id={"password"} onChange={(e)=>setUser({...user,password: e.target.value})} value={user.password} name={"password"} type={"password"} required/>*/}
         {/*    <button className={"w-32"} onClick={()=>signIn(user)}>Log in</button>*/}
         {/*    <button className={"w-32"} onClick={()=>signUp(user)} type={"submit"}>Sign up</button>*/}
         {/*</form>*/}
            <form className={"flex flex-col"}>
             <label htmlFor={"email"}>Email:</label>
             <input id={"email"}  name={"email"} type={"email"} required/>
             <label htmlFor={"password"}>Password:</label>
             <input id={"password"}   name={"password"} type={"password"} required/>
             <button className={"w-32"} formAction={login}>Log in</button>
             <button className={"w-32"} formAction={signup}>Sign up</button>
         </form>

        </>
    );
};

export default Page;