export function makeSlug() {
  return Math.random()
    .toString(36)
    .slice(2);
}

export function createOrUpdateOptions(schema, poll, options) {
  options.forEach(option => {
    const { text } = option;
    const optionId = option.id || null;
    if (optionId) {
      const option = schema.options.find(optionId);
      if (text === "") {
        option.destroy();
      } else {
        option.update({ text });
      }
    } else if (text !== "") {
      schema.options.create({ poll, text });
    }
  });
}

export function deleteMissingOptions(schema, poll, optionsToKeep) {
  const currentOptionIds = schema.options
    .where({ pollId: poll.id })
    .models.map(option => {
      return option.id;
    });
  const optionToKeepIds = optionsToKeep
    .filter(option => {
      return !!option.id;
    })
    .map(option => {
      return option.id;
    });
  const optionToDeleteIds = currentOptionIds.filter(
    x => !optionToKeepIds.includes(x)
  );

  optionToDeleteIds.forEach(id => {
    schema.options.find(id).destroy();
  });
}
