import Job from "../Models/job.model";
export const PostJob = async (req, res) => {
  try {
    const userId = req.id;
    const {
      title,
      description,
      requirements,
      salary,
      experience,
      location,
      jobType,
      position,
      companyId,
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !experience ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is Missing",
        success: false,
      });
      const job = await Job.create({
        title,
        description,
        requirements: requirements.split(","),
        salary: Number(salary),
        location,
        jobType,
        position,
        experienceLevel: experience,
        company: companyId,
        created_by: userId,
      });
      return res
        .status(200)
        .json({ message: "New Job Created Successfully", job, success: true });
    }
  } catch (err) {
    console.log(err);
  }
};

export const GetAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $optios: "i" } },
        {
          description: { $regex: keyword, $options: "i" },
        },
      ],
    };
    const jobs = await Job.find(query);
    if (!query) {
      return res
        .status(400)
        .json({ message: "Jobs Not Found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (err) {
    console.log(err);
  }
};

export const GetjobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res
        .status(400)
        .json({ message: "Jobs Not Found", success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (err) {
    console.log(err);
  }
};

export const GetAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res
        .status(400)
        .json({ message: "Jobs Not Found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (err) {
    console.log(err);
  }
};
