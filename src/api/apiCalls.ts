export const getBusApi = async (source: string, destination: string) => {
  let response;
  console.log("Source is", source);
  if (source && destination) {
    console.log("Inside if");
    response = await fetch(
      `http://localhost:8000/api/v1/bus/findBus?source=${source}&destination=${destination}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
  } else if (source) {
    response = await fetch(
      `http://localhost:8000/api/v1/bus/findBus?source=${source}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
  } else if (destination) {
    response = await fetch(
      `http://localhost:8000/api/v1/bus/findBus?destination=${destination}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
  } else {
    response = await fetch(`http://localhost:8000/api/v1/bus/findBus`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  }

  return response;
};
