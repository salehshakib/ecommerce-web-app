export const commonResponses = {
  200: { description: 'Success' },
  201: { description: 'Created' },
  204: { description: 'No Content' },
  400: { description: 'Bad Request' },
  401: { description: 'Unauthorized' },
  403: { description: 'Forbidden' },
  404: { description: 'Not Found' },
  409: { description: 'Conflict' },
  422: { description: 'Unprocessable Entity' },
  429: { description: 'Too Many Requests' },
  500: { description: 'Internal Server Error' },
  503: { description: 'Service Unavailable' },
};

export const responseGroups = {
  success: {
    200: commonResponses[200],
    201: commonResponses[201],
    204: commonResponses[204],
  },
  clientErrors: {
    400: commonResponses[400],
    401: commonResponses[401],
    403: commonResponses[403],
    404: commonResponses[404],
    409: commonResponses[409],
    422: commonResponses[422],
    429: commonResponses[429],
  },
  serverErrors: {
    500: commonResponses[500],
    503: commonResponses[503],
  },
};
