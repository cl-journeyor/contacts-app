const parsedJsonMaybe = (rawJson: string) => {
  try {
    return JSON.parse(rawJson);
  }
  catch (e) {
    return null;
  }
};

export {
  parsedJsonMaybe
};
