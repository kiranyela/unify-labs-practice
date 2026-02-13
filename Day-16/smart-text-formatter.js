
const titleCase = (str) => {
  return str
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const countVowels = (str) => {
  return (str.match(/[aeiou]/gi) || []).length;
};

const secretMessage = (str, wordsToHide) => {
  let result = str;
  wordsToHide.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    result = result.replace(regex, "***");
  });
  return result;
};

const sample =
  "   hello world, this is a secret message about JavaScript and coding.   ";
console.log("Title Case:", titleCase(sample));
console.log("Vowel Count:", countVowels(sample));
console.log(
  "Secret Message:",
  secretMessage(sample, ["secret", "JavaScript", "coding"])
);

module.exports = { titleCase, countVowels, secretMessage };
