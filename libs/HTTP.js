const BASE_URL = "/api/";

export default async function HTTP_GET(end_point, params = {}) {
  let query = "";

  if (Object.keys(params).length > 0) {
    query += "?";

    Object.entries(params).forEach(([key, val]) => {
      query += `&${key}=${val}`;
    });
  }

  const res = await fetch(`${BASE_URL}${end_point}${query}`);
  const data = await res.json();

  return data.data;
}
