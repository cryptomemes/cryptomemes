const awaitAllPromises = (promises) => {
    return promises.reduce((previousPromise, current) => {
        return previousPromise.then((allContents) => {
          return current.then((content) => {
            allContents.push(content);
            return allContents;
          });
        });
    }, Promise.resolve([]));
}

export default awaitAllPromises