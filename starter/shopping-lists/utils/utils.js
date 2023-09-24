const getIdFromUrl = (url, position = 2) => {
  const urlParts = url.pathname.split("/");
  return urlParts[position];
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
      status: 303,
      headers: { "Location": path },
  });
};

export { getIdFromUrl, redirectTo }