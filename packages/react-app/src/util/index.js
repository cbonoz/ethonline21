export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getName = (employee) => {
    return `${employee.first_name} ${employee.last_name}`
}
