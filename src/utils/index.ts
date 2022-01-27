export const getIp = async () => {
  const response = await fetch('https://geolocation-db.com/json/')
  return response.json()
}

export const getGeolocation = async (ip: string) => {
  const geolocation = await fetch(`http://api.sypexgeo.net/json/${ip}`)
  return geolocation.json()
}