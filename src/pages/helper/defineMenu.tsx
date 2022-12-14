import Dashboard from "@/components/Dashboard";
import Admin from "@/components/Dashboard/admin";
import Mananger from "@/components/Dashboard/mananger";

export default (category: string) => {
    switch (category) {
        case "colaborator":
            return <Dashboard />;
        case "mananger":
            return <Mananger />;
        case "admin":
            return <Admin />;
        default:
            return null;
    }
};
