const API_URL = "http://localhost:8000";

// Load planets and return as JSON.
async function httpGetPlanets() {
  const data = await fetch(`${API_URL}/planets`);
  const json = await data.json();
  return json;
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const data = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await data.json();
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
