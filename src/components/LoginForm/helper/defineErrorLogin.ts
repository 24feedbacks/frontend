export default (status: number) => {
    switch (status) {
        case 400:
            return "Email ou senha incorretos";
        case 401:
            return "Email ou senha incorretos";
        default:
            return "Email não existente na base de dados";
    }
};
