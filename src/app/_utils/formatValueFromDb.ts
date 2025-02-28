const formatValueFromDb = (text: string): string => {
  const formattedText = text
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return formattedText;
};

export default formatValueFromDb;
