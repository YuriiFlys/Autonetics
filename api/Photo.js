const sas_token = "";
const get_photo = async (url) => {
  console.log("url", url + "?" + sas_token);
  return url + "?" + sas_token;
};
export default get_photo;
