
const GetPhotoReference = async (destination, place) => {
    const response = await fetch(`https://maps.gomaps.pro/maps/api/place/textsearch/json?location=${destination}&query=${place}&key=AIzaSyCfbvKy-HBlex2UA8v2jG0MdxNB4mOc6P0`);
    const data = await response.json();
    return data.results[0].photos[0].photo_reference;
}

export {GetPhotoReference};
