import { useRouter } from "next/router";
import WithLayout from "../components/MainLayout";

const Room = () => {
    const router = useRouter();

    return (
        <React.Fragment>
            {/* <h1>{router.query.id}</h1> */}
            <p>This is the blog post content.</p>
        </React.Fragment>
    );
};
export default WithLayout(Room);
