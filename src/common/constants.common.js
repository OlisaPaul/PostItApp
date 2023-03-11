const constants = {
  DATABASE_URI: process.env.DATABASE_URI,

  DATABASES: {
    ROOM: "room",
    ROOM_TYPE: "room_type",
    USER: "user",
  },
  USER_TYPES: {
    USER: "user",
    ADMIN: "admin",
  },
  MESSAGES: {
    FETCHED: "Resource fetched successfully",
    UPDATED: "Resource updated successfully",
    ERROR: "Resource error",
    CREATED: "Resource created successfully",
    DELETED: "Resource deleted successfully",
    UNAUTHORIZE(operate) {
      return `You cannot ${operate} a resource created by another user`;
    },
    NOT_FOUND: "Resource not found",
    DEFAULT:
      "Hotel Management API is Online. Use either of the following routes: (room, roomtype, auth)",
    HOTEL_ROOM_DEFAULT:
      "Choose from one of the following routes: \nGET(/ - fetch all rooms, \n/:id - fetch particular room \n/search - Fetch particular room with id, min/max price and room type \n)",
    HOTEL_ROOM_TYPE_DEFAULT: "",
    AUTH_DEFAULT: "",
    LOGOUT: "Successfully logged out! Have a nice day.",
    LOGIN_FIRST: "Error! Login first",
    LOGGED_IN: "Successfully logged in",
    LOGIN_FAILURE: "Unable to login. Username or password incorrect",
  },
  errorMessage(data) {
    return { message: this.MESSAGES.NOT_FOUND, success: false, data };
  },
};

module.exports = constants;
