const userBaseUrl = "/auth";

export const userApi = {
  DELETE_USER: `${userBaseUrl}/user`,
  GET_ALL_USER: `${userBaseUrl}/all-users`,
};

const profileBaseUrl = "/auth/profile";

export const profileApi = {
  GET_PROFILE: `${profileBaseUrl}`,
  UPDATE_PROFILE: `${profileBaseUrl}`,
  UPDATE_AVATAR: `${profileBaseUrl}/avatar`,
  DELETE_AVATAR: `${profileBaseUrl}/avatar`,
};
