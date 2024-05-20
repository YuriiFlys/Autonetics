const sas_token = "";
const get_photo = async (url) => {
  try {
    const result = await fetch(url + sas_token);
    return result;
  } catch (error) {
    console.error(error);
  }
};
