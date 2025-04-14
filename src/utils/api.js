import dbProductRelease from '../constants/dbProductRelease.json'

export const fetchData = () => {
  return new Promise((resolve, reject) => {
    resolve(dbProductRelease)
  })
}