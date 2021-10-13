import Config from 'react-native-config';

const prefixes = {
  auth: {login: 'auth/signin'},
  projectList: 'project/list',
};

export default {prefixes, apiURL: Config.API_URL};
