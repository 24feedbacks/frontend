import "../styles/global.scss";

import { UserContext } from "../context/user";
import { useState } from "react";
import { AppProps } from "next/app";
import Dashboard from "@/components/Dashboard";
import Mananger from "@/components/Dashboard/mananger";
import defineMenu from "./helper/defineMenu";

const MyApp = ({ Component, pageProps, ...nextData }: AppProps) => {
    const props: any = nextData;
    const [userData, setUserData] = useState(props?.userData);
    const Menu = defineMenu(userData?.category);

    console.log(Menu);

    return (
        <UserContext.Provider value={[userData, setUserData]}>
            <div className="Container">
                {Component.displayName !== "Login" ? Menu : null}
                <div>
                    <Component {...pageProps} />
                </div>
            </div>
        </UserContext.Provider>
    );
};

MyApp.getInitialProps = async ({ ctx }: any) => {
    const userData = ctx?.req?.cookies?.userData
        ? JSON.parse(ctx.req.cookies.userData)
        : {};
    return { userData };
};

export default MyApp;
