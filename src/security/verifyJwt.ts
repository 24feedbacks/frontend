export default (req: any): boolean => {
    if (req) return !!JSON.parse(req);
    else return false;
};
