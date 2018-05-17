/*
 * Returns a vector given two angles.
 * @param float alpha - First angle in degrees
 * @param float beta - Second angle in degrees
 * @returns {x,y,z} - Calculated vector
 */
export function AngleToVector(alpha, beta) {
  const alphaR = alpha * Math.PI / 180;
  const betaR = beta * Math.PI / 180;
  const x = Math.sin(alphaR) * Math.cos(betaR);
  const y = Math.cos(alphaR) * Math.cos(betaR);
  const z = Math.sin(betaR);
  return { x, y, z };
}

/*
 * Returns the angle between two different vectors
 * @param {x,y,z} vector1 - First vector to be compared
 * @param {x,y,z} vector2 - Second vector to be compared
 * @returns float - Calculated angle in degrees
 */
export function AngleBetweenVectors(vector1, vector2) {
  const dotProd = vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z;
  const lengthSQ1 = vector1.x * vector1.x + vector1.y * vector1.y + vector1.z * vector1.z;
  const lengthSQ2 = vector2.x * vector2.x + vector2.y * vector2.y + vector2.z * vector2.z;

  return 180 / Math.PI * Math.acos(dotProd / Math.sqrt(lengthSQ1 * lengthSQ2));
}

export function normalize(vector) {
  const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
  if (length === 0) {
    return { x: 0, y: 0, z: 0 };
  }
  const lengthInv = 1 / length;
  return { x: vector.x * lengthInv, y: vector.y * lengthInv, z: vector.z * lengthInv };
}

export function rotateVector(vector, axis) {
  const angle = Math.PI / 180 * AngleBetweenVectors({ x: 0, y: 0, z: 1 }, axis);
  // Cross between axis and 0,0,1
  const cross = normalize({ x: axis.y, y: -axis.x, z: 0 });
  const s = Math.sin(angle);
  const c = Math.cos(angle);
  const dot = cross.x * vector.x + cross.y * vector.y + cross.z * vector.z;
  const xPrime =
    cross.x * dot * (1 - c) + vector.x * c + (-cross.z * vector.y + cross.y * vector.z) * s;
  const yPrime =
    cross.y * dot * (1 - c) + vector.y * c + (cross.z * vector.x - cross.x * vector.z) * s;
  const zPrime =
    cross.z * dot * (1 - c) + vector.z * c + (-cross.y * vector.x + cross.x * vector.y) * s;
  return { x: xPrime, y: yPrime, z: zPrime };
}

export default AngleToVector;
