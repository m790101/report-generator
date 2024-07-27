function rocToAd(dateString: string) {
  const dateArray = dateString.split('/');
  const year = Number(dateArray[0]) + 1911;
  const month = dateArray[1];
  const day = dateArray[2];

  return year.toString() + month + day;
}

export { rocToAd };
