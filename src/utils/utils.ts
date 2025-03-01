export function getPokemonNumber() {
  return Math.floor(Math.random() * 151);
}

function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function formatPokemonLabel(name: string) {
  const formattedName = name.replace(/-/g, " ");

  return formattedName.split(" ").map(capitalizeFirstLetter).join(" ");
}

export function getCurrentDate() {
  const date = new Date();
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  const h = date.getHours();
  const min =
    date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes();

  return y + "-" + m + "-" + d + " " + h + ":" + min;
}
