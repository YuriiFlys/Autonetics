const sas_token =
  "sp=r&st=2024-05-20T14:13:09Z&se=2024-05-23T22:13:09Z&sv=2022-11-02&sr=c&sig=4VvyEyelTn8f4CUjshcANcWOsIwgUF9RVayHsqguUDY%3D";
const get_photo = async (url) => {
  console.log("url", url + "?" + sas_token);
  return url + "?" + sas_token;
};
export default get_photo;
