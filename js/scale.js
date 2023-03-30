const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const valueScale = document.querySelector('.scale__control--value');
const controlSmallerScale = document.querySelector('.scale__control--smaller');
const controlBiggerScale = document.querySelector('.scale__control--bigger');
const imgElement = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imgElement.style.transform = `scale(${value / 100})`;
  valueScale.value = `${value}%`;
}

// const downloadScale = () => {

// }
