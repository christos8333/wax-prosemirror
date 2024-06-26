export const safeParse = (str, fallbackKey) => {
  try {
    const parsed = JSON.parse(str);
    return parsed;
  } catch (e) {
    return { [fallbackKey]: str };
  }
};

export const resultsToHtml = (key, value) => {
  const variations = {
    links:
      typeof value === 'string'
        ? value
        : value
            ?.map(item => `<a href="${item}" target="_blank">${item}</a></br>`)
            .join(''),
    default:
      typeof value === 'string'
        ? value
        : value?.map(item => `<p>${item}</p>`).join('') ?? '',
  };
  return variations[key] ?? variations.default;
};

export const getUpdatedPosition = ({ surface, end, overlay }) => {
  const top = end.top - surface.top + 20;
  let left = end.left - surface.left - overlay.width / 2;

  if (end.left - overlay.width / 2 < surface.left) {
    left += surface.left - (end.left - overlay.width / 2);
  }

  // Don't get out of right boundary of the surface
  if (end.left + overlay.width / 2 > surface.right) {
    left -= end.left + overlay.width / 2 - surface.right;
  }

  return { left, top };
};

export const copyTextContent = async text => {
  if (!text) return;
  await navigator.clipboard.writeText(text);
};
