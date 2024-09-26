import Company from "../Models/Companymodel.js";

export const RegisterCompany = async (req, res) => {
  try {
    const { CompanyName } = req.body;
    if (!CompanyName) {
      return res
        .status(400)
        .json({ message: "Company Name is Required", success: false });
    }
    let company = await Company.findOne({ name: CompanyName });
    if (company) {
      return res.status(400).json({
        message: "Already the Company was Register",
        success: false,
      });
    }
    company = await Company.create({
      name: CompanyName,
      userId: req.id,
    });
    return res.status(201).json({
      message: "Company Created Successfully",
      company,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const GetCompany = async (req, res) => {
  try {
    const userId = req.id; //Logged In User ID
    const company = await Company.find({ userId });
    if (!company) {
      return res.status(404).json({
        message: "Company Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Companys Details Fetched Successfully",
      company,
    });
  } catch (err) {
    console.log(err);
  }
};
//Get Company by ID
export const GetCompanyByID = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      message: " Fetched By UserID Successfully",
      company,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UpdateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    const id = req.params.id;
    //Cloudinary

    const UpdateData = { name, description, website, location };
    const company = await Company.findByIdAndUpdate(id, UpdateData, {
      new: true,
    });
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company Not Found", success: false });
    }
    return res.status(200).json({
      message: "Company Information Updated Successfully",
      company,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
