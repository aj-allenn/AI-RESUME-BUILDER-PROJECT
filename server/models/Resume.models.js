import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            default: "Untitled Resume",
        },
        personal_info: {
            fullname: String,
            profession: String,
            email: String,
            phone: String,
            location: String,
            linkedin: String,
            website: String,
            image: String,
        },
        professional_summary: {
            type: String,
            default: "",
        },
        experience: [
            {
                company: String,
                position: String,
                start_date: String,
                end_date: String,
                description: String,
                is_current: Boolean,
            }
        ],
        education: [
            {
                degree: String,
                institution: String,
                start_date: String,
                end_date: String,
                description: String,
                is_current: Boolean,
            }
        ],
        projects: [
            {
                name: String,
                description: String,
                technologies: String,
                link: String,
                start_date: String,
                end_date: String,
            }
        ],
        skills: [String],
        template: {
            type: String,
            default: "modern",
            enum: ["modern", "classic", "minimal", "minimal-image"],
        },
        accent_color: {
            type: String,
            default: "#038079",
        },
        public: {
            type: Boolean,
            default: false,
        },
        fileUrl: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Resume", resumeSchema);