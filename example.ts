function roleChecker(requirdRoles: string[], userRoles: string[]) {
  console.log('userRoles: ', userRoles);
  console.log('requirdRoles: ', requirdRoles);
  for (const userR in requirdRoles) {
    console.log('userR:', userR);
    test: for (const finded in userRoles) {
      console.log('finded: ', finded);
      if (requirdRoles[userR] == userRoles[finded]) {
        console.log('sssssssssssssssssssssss');
        return true;
      } else {
        continue test;
      }
    }
  }
}

const testResult = roleChecker(
  ['amin', 'alireza', 'ravaei'],
  ['amir', 'hamid', 'ravaei'],
);
console.log('testResult: ', testResult);
