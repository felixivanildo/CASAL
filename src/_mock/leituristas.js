
import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get("http://10.254.4.132:3005/api/leituristas");
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const generateUsers = async () => {
  const fetchedData = await fetchData();

  // console.log(fetchedData)
  
  
  const users = fetchedData.map((data, index) => (    
    {
    id: faker.datatype.uuid(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    name: data.name,
    company: faker.company.name(),
    isVerified: faker.datatype.boolean(),
    status: sample(['active', 'banned']),
    role: sample([
      'Leader',
      'Hr Manager',
      'UI Designer',
      'UX Designer',
      'UI/UX Designer',
      'Project Manager',
      'Backend Developer',
      'Full Stack Designer',
      'Front End Developer',
      'Full Stack Developer',
    ]),
  }
  
  ));

  
  
  return users;
};

const teste = generateUsers();

export default teste