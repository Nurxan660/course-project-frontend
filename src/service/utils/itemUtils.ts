const transformItemCreateData = (data: any, collectionId: number) => {
  const { name, tags, ...customFieldsData } = data;
  const arrayTags = mapTagsToArray(String(tags))
  return { name, tags: arrayTags, collectionId, customFieldValues: customFieldsData };
};

const mapTagsToArray = (tags: string) => {
  return String(tags)
    .split(",")
    .map((tag: string) => tag.trim())
    .filter((tag: string) => tag !== "");
};

export { transformItemCreateData };
