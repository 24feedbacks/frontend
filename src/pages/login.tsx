import LoginForm from "@/components/LoginForm/LoginForm";
import Container from "@material-ui/core/Container";
import style from "@/styles/Login.module.css";

const Login = () => (
    <>
        <style jsx global>
            {`
            html {
                height: 100%;
            }
     body {
       background:      background: rgb(88, 82, 242);
       background: linear-gradient(
           38deg,
           rgba(88, 82, 242, 1) 39%,
           rgba(170, 167, 242, 1) 100%
           );};

     }
`}
        </style>

        <Container className={style.container}>
            <div className={style.container}>
                <LoginForm />
            </div>
        </Container>
    </>
);

Login.displayName = "Login";

export default Login;
