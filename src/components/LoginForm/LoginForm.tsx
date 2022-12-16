import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "../../context/user";
import { login } from "../../services/api";
import defineErrorLogin from "./helper/defineErrorLogin";

import style from "./Style.module.scss";

export default () => {
    const [visibility, setVisibility] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useContext<any>(UserContext);
    const router = useRouter();

    const doLogin = async () => {
        setError("");

        const today = new Date();

        const result = await login(email, password);

        if (typeof result === "number") {
            return setError(defineErrorLogin(result));
        }

        const userData = {
            name: result?.name,
            id: result?.id,
            email: result?.email,
            team: result?.team?.id,
            category: result?.category?.name,
        };

        setUser(userData);

        Cookies.set("userData", JSON.stringify(userData), {
            expires: 24 * 5 * 60 * 60,
        });

        const isAdmin = userData.category === "admin";

        if (error.length === 0) router.push(isAdmin ? "/adminHome" : "/home");
    };

    return (
        <>
            <div className={style.glassForm}>
                <div className={style.input}>
                    <TextField
                        id="standard-basic"
                        label="Login"
                        variant="standard"
                        type={"text"}
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <FormControl variant="standard">
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Password
                        </InputLabel>
                        <Input
                            value={password}
                            type={visibility ? "text" : "password"}
                            id="input-with-icon-adornment"
                            onChange={(e) => setPassword(e.target.value)}
                            required={true}
                            endAdornment={
                                <InputAdornment
                                    position="start"
                                    onClick={() => setVisibility(!visibility)}
                                >
                                    {!visibility ? (
                                        <Visibility />
                                    ) : (
                                        <VisibilityOff />
                                    )}
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <h3>{error}</h3>
                </div>
                <div className={style.button}>
                    <Button
                        variant="outlined"
                        disabled={email && password ? false : true}
                        onClick={doLogin}
                    >
                        Login
                    </Button>
                </div>
            </div>
        </>
    );
};
