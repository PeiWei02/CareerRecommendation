import axios from "axios";

export const theVarkResultService = async(answers) => {
    const BASE_URL = `http://localhost:3000/survey`;

        const id = "66530595dc9749f53177b1f5"; 

        try {
            console.log(`${BASE_URL}/${id}/theVarkResult`)
            const response = await axios.post(
                `${BASE_URL}/${id}/theVarkResult`,
                answers,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
}
