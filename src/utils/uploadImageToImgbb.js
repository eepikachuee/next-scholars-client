const uploadImageToImgbb = async (imageFile) => {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  const formData = new FormData();
  formData.append("image", imageFile);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const result = await res.json();
  if (result.success) return result.data.url;
  throw new Error("Image upload failed");
};

export default uploadImageToImgbb;
