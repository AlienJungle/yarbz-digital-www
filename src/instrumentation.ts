export function register() {
  reportEnvironmentInfo();
}

function reportEnvironmentInfo() {
  console.log("Current environment", process.env);
}
