export const uuid = () => {
  // Get the current timestamp in milliseconds
  const timestamp = Date.now().toString(16).padStart(16, "0");

  // Generate a random UUID
  const randomUUID = crypto.randomUUID();

  // Combine the timestamp and the random UUID
  const timeSortableUUID = timestamp + "-" + randomUUID;
  return timeSortableUUID;
};
