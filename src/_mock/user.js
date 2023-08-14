import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import axios from 'axios';
// // import { useEffect, useState } from 'react';

// // ----------------------------------------------------------------------
// let objectest = []


// const fetchData = async () => {
//   try {
//     const response = await axios.get("http://10.254.4.132:3005/api/leituristas");
//     // console.log(response.data)
//     return response.data
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return [];
//   }
// };

// fetchData().then(async (e)=>{
//    objectest = await e
//   console.log(objectest)
// })

import teste from './leituristas';



 


const users = [...Array(50)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
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
}));

console.log(users)

export default users;

// export default teste;
