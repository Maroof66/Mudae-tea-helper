const list = require("word-list-json");

module.exports = {
  YellowTea,
  BlackTea,
  RedTea,
};

function YellowTea(task) {
  return list
    .filter((word) => word.includes(task.toLowerCase()))
    .sort((a, b) => a.length - b.length || a.localeCompare(b))
    .reduce((chunks, word, index) => {
      const chunkIndex = Math.floor(index / 8);
      if (!chunks[chunkIndex]) chunks[chunkIndex] = [];
      chunks[chunkIndex].push(word);
      return chunks;
    }, [])
    .map((chunk) => chunk.join(" "));
}

function BlackTea(task) {
  const matches = list.filter((word) => word.includes(task.toLowerCase()));
  const shortestLength = Math.min(...matches.map((word) => word.length));
  return matches
    .filter((word) => word.length <= shortestLength + 2)
    .sort((a, b) => a.length - b.length);
}

function RedTea(task) {
  return list
    .filter((word) => word.includes(task.toLowerCase()) && word.length <= 11)
    .sort((a, b) => b.length - a.length);
}
