let resolve_image = (path) => {
  let image = require.context(
    "../assets/",
    false,
    /\.jpeg$|\.jpg$|\.webp$|\.png$/
  );
  try {
    return image("./" + path);
  } catch (error) {
    return image("./" + "placeholder.png");
  }
};

export default resolve_image;
