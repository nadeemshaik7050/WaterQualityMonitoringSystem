// async function uploadReport(data, imageFile) {
//   const formData = new FormData();

//   formData.append("waterBody", data.waterBody);
//   formData.append("postcode", data.postcode);
//   formData.append("measurement", data.measurement);
//   formData.append("userId", data.userId);
//   formData.append("userName", data.userName);

//   formData.append("images", imageFile, imageFile.name);

//   try {
//     const response = await fetch("https://your-api-endpoint/upload", {
//       method: "POST",
//       body: formData
//     });

//     const result = await response.json();
//     console.log("Uploaded!", result);
//   } catch (err) {
//     console.error("Upload failed", err);
//   }
// }
