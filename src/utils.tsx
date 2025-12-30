const nonNull = <T,>(value: T | null | undefined): T => {
  const throwError = (): T => {
    throw new TypeError(`${ value } was found where not applicable`);
  };

  return value ?? throwError();
};

const parsedJsonMaybe = (rawJson: string) => {
  try {
    return JSON.parse(rawJson);
  }
  catch (e) {
    return null;
  }
};

export {
  nonNull,
  parsedJsonMaybe
};
