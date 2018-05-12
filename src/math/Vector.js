export function AngleToVector(alpha, beta) {
  const alphaR = alpha * Math.PI / 180;
  const betaR = beta * Math.PI / 180;
  const x = Math.sin(alphaR) * Math.cos(betaR);
  const y = Math.cos(alphaR) * Math.cos(betaR);
  const z = Math.sin(betaR);
  return { x, y, z };
}

export function AngleBetweenVectors(vector1, vector2) {
  const dotProd = vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z;
  const lengthSQ1 = vector1.x * vector1.x + vector1.y * vector1.y + vector1.z * vector1.z;
  const lengthSQ2 = vector2.x * vector2.x + vector2.y * vector2.y + vector2.z * vector2.z;

  return 180 / Math.PI * Math.acos(dotProd / Math.sqrt(lengthSQ1 * lengthSQ2));
}

export default AngleToVector;
