async function getCoordsFromCep(cep) {
  const url = `https://nominatim.openstreetmap.org/search?postalcode=${cep}&country=Brazil&format=json`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data || data.length === 0) throw new Error(`CEP não encontrado: ${cep}`);
  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon)
  };
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

async function calcularDistanciaEntreCeps(cepOrigem, cepDestino) {
  try {
    const origem = await getCoordsFromCep(cepOrigem);
    const destino = await getCoordsFromCep(cepDestino);

    const distanciaKm = haversine(origem.lat, origem.lon, destino.lat, destino.lon);
    return distanciaKm.toFixed(2)
  } catch (err) {
    console.error('Erro:', err.message);
  }
}

export {calcularDistanciaEntreCeps};