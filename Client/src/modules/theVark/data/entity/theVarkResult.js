import { theVarkAsset } from "../../view/asset";

export const theVarkResult = {
    V: {
        name: "visual",
        description: "You prefer learning through visual aids such as charts and diagrams.",
        traits: [
            "Prefer to see information in pictures, diagrams, charts, and graphs."
        ],
        techniques: [
            "Use diagrams, mind maps, and infographics.",
            "Watch videos or look at presentations with images.",
            "Color-code your notes for better visualization.",
            "Use flowcharts to map out concepts."
        ],
        feedback: [
            "You thrive when information is presented visually.",
            "To improve retention, try using mind maps or infographics to break down complex ideas."
        ],
        animation: theVarkAsset.visual
    },
    A: {
        name: "auditory",
        description: "You absorb information best through listening and speaking.",
        traits: [
            "Prefer to hear information rather than see it."
        ],
        techniques: [
            "Listen to lectures, podcasts, or audiobooks.",
            "Engage in group discussions or verbal explanations.",
            "Use mnemonic devices or make recordings of the material and listen to it repeatedly."
        ],
        feedback: [
            "Consider discussing concepts with peers or listening to lectures to reinforce your understanding.",
            "You may find it helpful to explain concepts out loud to yourself or others."
        ],
        animation: theVarkAsset.auditory
    },
    R: {
        name: "reading and writting",
        description: "You learn best through reading and writing about topics.",
        traits: [
            "Prefer written text aand enjoy reading and writing to absorb information."
        ],
        techniques: [
            "Write summaries, lists, or notes in your own words.",
            "Read articles, textbooks, and websites related to the subject.",
            "Rewrite key information in various forms to help reinforce memory."
        ],
        feedback: [
            "You thrive when given the opportunity to read or write about topics.",
            "Consider taking detailed notes and writing summaries to reinforce your learning."
        ],
        animation: theVarkAsset.readingWriting
    },
    K: {
        name: "kinesthetic",
        description: "You learn best through physical movement and hands-on activities.",
        traits: [
            "Prefer hands-on learning and physical activities."
        ],
        techniques: [
            "Engage in physical activities related to learning (e.g., role-playing or building models).",
            "Use gestures or actions while studying.",
            "Learn by practicing, experimenting, and doing tasks actively."
        ],
        feedback: [
            "To solidify your understanding, engage in practical exercises or simulate real-world scenarios.",
            "Hands-on learning will help you retain information better."
        ],
        animation: theVarkAsset.kinesthetic
    }
};
