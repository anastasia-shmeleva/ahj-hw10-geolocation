export default function geolocation() {
  function success(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    return `${latitude}, ${longitude}`;
  }

  function error(e) {
    return e.code;
  }

  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (data) => resolve(success(data)),
        (data) => reject(error(data)),
      );
    } else {
      reject(new Error('Geolocation is not supported by your browser'));
    }
  });
}
