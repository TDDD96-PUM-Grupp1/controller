export function AngleToVector(alpha, beta) {
  let alphaR = alpha * Math.PI / 180;
  let betaR = beta * Math.PI / 180;
  let x = Math.sin(alphaR) * Math.cos(betaR);
  let y = Math.cos(alphaR) * Math.cos(betaR);
  let z = Math.sin(betaR);
  return { x, y, z };
}

function VectorToAngle(vector) {
  let beta = Math.asin(vector.z);
  if (beta < 0) beta += 2 * Math.PI;
  let alpha1 = Math.asin(vector.x / Math.cos(beta));
  let alpha2 = Math.acos(vector.y / Math.cos(beta));
  let alpha = 0;
  if (alpha1 === alpha2) {
    alpha = alpha1;
  } else if (180 - alpha1 === -alpha2) {
    alpha = 180 - alpha1;
  }
  if (alpha < 0) alpha += 2 * Math.PI;
  return { alpha: alpha * 180 / Math.PI, beta: beta * 180 / Math.PI };
}

export function AngleBetweenVectors(vector1, vector2) {
  const dotProd = vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z;
  const lengthSQ1 = vector1.x * vector1.x + vector1.y * vector1.y + vector1.z * vector1.z;
  const lengthSQ2 = vector2.x * vector2.x + vector2.y * vector2.y + vector2.z * vector2.z;

  return 180 / Math.PI * Math.acos(dotProd / Math.sqrt(lengthSQ1 * lengthSQ2));
}

export default AngleToVector;
