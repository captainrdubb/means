export const abbreviationFromFullName = (fullName) => {
  let names = fullName.split(' ');
  if (names.length === 1) return names[0][0].toUpperCase();
  return `${names[0][0].toUpperCase()}${names[
    names.length - 1
  ][0].toUpperCase()}`;
};

export const abbreviation = (firstName, lastName) => {
  if (!firstName && !lastName) return '';
  if (!lastName) return firstName[0].toUpperCase();
  return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
};
