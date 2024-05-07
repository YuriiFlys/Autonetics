import ApiManeger from "./ApiManeger";

export const login = async (data) => {
  try {
    const result = await ApiManeger("api/auth/authenticate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });
    return result;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};
