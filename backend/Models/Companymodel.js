import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    website: {
      type: String,
      // required: true,
    },
    location: {
      type: String,
      // required: true,
    },
    logo: {
      type: String, //URL Company Logo
      // required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Company = mongoose.model("Company", CompanySchema);

export default Company;
