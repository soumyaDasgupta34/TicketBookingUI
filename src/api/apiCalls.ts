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

export const logInApi = async (email: string, password: string) => {
  const response = await fetch("http://localhost:8000/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response;
};

export const signUpApi = async (
  email: string,
  password: string,
  userName: string
) => {
  const response = await fetch(
    "http://localhost:8000/api/v1/auth/registerUser",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password, userName }),
    }
  );
  const responseJson = await response.json();
  return responseJson;
};

export const getBookingsApi = async () => {
  const response = await fetch("http://localhost:8000/api/v1/seat/booked", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
  });
  const responseJson = await response.json();
  return responseJson;
};

export const cancelSeatApi = async (seatId: string) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/seat/cancel/${seatId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    }
  );
  const responseJson = await response.json();
  return responseJson;
};

export const getAvailableSeatsApi = async (busId: string) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/seat/booked/${busId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    }
  );
  const responseJson = await response.json();
  return responseJson;
};

export const bookTicketApi = async (
  bookingDetails: Array<any>,
  busId: string
) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/seat/book/${busId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
      body: JSON.stringify(bookingDetails),
    }
  );
  const responseJson = await response.json();
  return responseJson;
};
