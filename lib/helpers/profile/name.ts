/**
 * Splits a full name into first name and last name.
 * @param fullname The full name string to split.
 * @returns An object containing firstname and lastname.
 *
 * @example
 * splitName("John Doe") // { firstname: "John", lastname: "Doe" }
 * splitName("Alice") // { firstname: "Alice", lastname: "" }
 * splitName("") // { firstname: "", lastname: "" }
 * splitName("  Bob   Smith   Jr.  ") // { firstname: "Bob", lastname: "Smith Jr." }
 * splitName("Mary Ann Johnson") // { firstname: "Mary", lastname: "Ann Johnson" }
 * splitName("单名") // { firstname: "单名", lastname: "" }
 */
export function splitName(fullname: string): {
  firstname: string;
  lastname: string;
} {
  if (!fullname) return { firstname: "", lastname: "" };

  const parts = fullname.trim().split(/\s+/);
  if (parts.length === 1) return { firstname: parts[0], lastname: "" };

  return {
    firstname: parts[0],
    lastname: parts.slice(1).join(" "),
  };
}
