
export const saveLocalStorageText = (text: string) => {
  localStorage.setItem("text", text);
}

export const loadLocalStorageText = (): string => {
  const text = localStorage.getItem("text");
  return text === null ? "SOS" : text;
}
