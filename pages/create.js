import { useRouter } from "next/router";
import withLayout from "../components/MainLayout";
import { useState } from "react";

const createRoom = () => {
    const router = useRouter();

    return (
        <React.Fragment>
            <h1>Create</h1>
            <p>This is the blog post content.</p>
            <label for="range">Range</label>
            <input type="range" id="vol" name="range" min="0" max="10"></input>
            <label for="area">Area</label>
            <input type="text" id="area" name="area" />
            <button>Create</button>
        </React.Fragment>
    );
};
export default withLayout(createRoom);
