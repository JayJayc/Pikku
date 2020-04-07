import { useRouter } from "next/router";
import withLayout from "../components/MainLayout";

const createRoom = () => {
    const router = useRouter();

    return (
        <React.Fragment>
            <h1>Join</h1>
            <p>This is the blog post content.</p>
        </React.Fragment>
    );
};
export default withLayout(createRoom);
