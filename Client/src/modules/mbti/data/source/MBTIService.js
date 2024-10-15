import axios from "axios";

export const MBTIService = async(answers) => {
    const BASE_URL = `http://localhost:3000/survey`;

        const id = "66530595dc9749f53177b1f5"; 

        try {
            const response = await axios.post(
                `${BASE_URL}/${id}/mbtiResult`,
                answers,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
}
