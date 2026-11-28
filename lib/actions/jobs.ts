const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const createJob = async (data: FormData) => {
  // Convert FormData into a JSON-friendly object
  const jobData = {
    ...Object.fromEntries(data.entries()),
    isRemote: data.get("isRemote") === "on",
    minSalary: data.get("minSalary") ? Number(data.get("minSalary")) : null,
    maxSalary: data.get("maxSalary") ? Number(data.get("maxSalary")) : null,
  }

  const response = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(jobData),
  })
  return response.json()
}
