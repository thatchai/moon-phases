//ref data: 
//  https://ngthai.com/science/17715/themoonphases/
//ref img dl: 
//  https://www.moonpage.com/lunarindx.html
//ref img: 
//  https://www.quora.com/What-is-the-difference-between-the-first-quarter-of-the-moon-and-the-last-quarter-of-the-Moon-They-both-look-the-same-to-me

//ref js:
//  https://gist.github.com/endel/dfe6bb2fbe679781948c
const moonFuncGetMoonPhase = (year, month, day) => {
  var c = e = jd = b = 0;

  if (month < 3) {
      year--;
      month += 12;
  }

  ++month;

  c = 365.25 * year;

  e = 30.5 * month;

  jd = c + e + day - 694039.09; //jd is total days elapsed
  
  jd /= 29.5305882; //divide by the moon cycle
  
  b = parseInt(jd); //int(jd) -> b, take integer part of jd

  jd -= b; //subtract integer part to leave fractional part of original jd
  
  b = Math.round(jd * 30); //scale fraction from 0-8 and round
   
  if (b >= 30 ) {
      b = 0; //0 and 8 are the same so turn 8 into 0
  }

  // 0 => New Moon
  // 1 => Waxing Crescent Moon
  // 2 => Quarter Moon
  // 3 => Waxing Gibbous Moon
  // 4 => Full Moon
  // 5 => Waning Gibbous Moon
  // 6 => Last Quarter Moon
  // 7 => Waning Crescent Moon
  
  return b;
}

//ref js:
//  https://dev.to/thormeier/use-your-i-moon-gination-lets-build-a-moon-phase-visualizer-with-css-and-js-aih
const moonFuncGetMoonPhaseRotation = date => {
  const cycleLength = 29.5 // days

  const knownNewMoon = new Date('2022-03-02 18:34:00')
  const secondsSinceKnownNewMoon = (date - knownNewMoon) / 1000
  const daysSinceKnownNewMoon = secondsSinceKnownNewMoon / 60 / 60 / 24
  const currentMoonPhasePercentage = (daysSinceKnownNewMoon % cycleLength) / cycleLength

  return 360 - Math.floor(currentMoonPhasePercentage * 360)
}

const moonFuncGetMoonPhaseAnglePercent = phase => {
  let data = {
    0: 0,
    1: 1.09,
    2: 4.32,
    3: 9.55,
    4: 16.54,
    5: 25,
    6: 34.55,
    7: 44.77,
    8: 55.23,
    8: 65.45,
    10: 75,
    11: 83.46,
    12: 90.45,
    13: 95.68,
    14: 98.91,
    15: 100,
    16: 98.91,
    17: 95.68,
    18: 90.45,
    19: 83.46,
    20: 75,
    21: 65.45,
    22: 55.23,
    23: 44.77,
    24: 34.55,
    25: 25,
    26: 16.54,
    27: 9.55,
    28: 4.32,
    29: 1.09
  }
  return data[phase]
}

//
const moonFuncMoonPhaseData = (phase) => {
  let data = {
    0: 'แรม 15 ค่ำ (New Moon)',
    1: 'ขึ้น 1 ค่ำ (Waxing Crescent Moon)',
    2: 'ขึ้น 2 ค่ำ (Waxing Crescent Moon)',
    3: 'ขึ้น 3 ค่ำ (Waxing Crescent Moon)',
    4: 'ขึ้น 4 ค่ำ (Waxing Crescent Moon)',
    5: 'ขึ้น 5 ค่ำ (Waxing Crescent Moon)',
    6: 'ขึ้น 6 ค่ำ (Waxing Crescent Moon)',
    7: 'ขึ้น 7 ค่ำ (Waxing Crescent Moon)',
    8: 'ขึ้น 8 ค่ำ (First Quarter Moon)',
    9: 'ขึ้น 9 ค่ำ (Waxing Gibbous Moon)',
    10: 'ขึ้น 10 ค่ำ (Waxing Gibbous Moon)',
    11: 'ขึ้น 11 ค่ำ (Waxing Gibbous Moon)',
    12: 'ขึ้น 12 ค่ำ (Waxing Gibbous Moon)',
    13: 'ขึ้น 13 ค่ำ (Waxing Gibbous Moon)',
    14: 'ขึ้น 14 ค่ำ (Waxing Gibbous Moon)',
    15: 'ขึ้น 15 ค่ำ (Full Moon)',
    16: 'แรม 1 ค่ำ (Waning Gibbous Moon)',
    17: 'แรม 2 ค่ำ (Waning Gibbous Moon)',
    18: 'แรม 3 ค่ำ (Waning Gibbous Moon)',
    19: 'แรม 4 ค่ำ (Waning Gibbous Moon)',
    20: 'แรม 5 ค่ำ (Waning Gibbous Moon)',
    21: 'แรม 6 ค่ำ (Waning Gibbous Moon)',
    22: 'แรม 7 ค่ำ (Waning Gibbous Moon)',
    23: 'แรม 8 ค่ำ (Last Quarter Moon)',
    24: 'แรม 9 ค่ำ (Waning Crescent Moon)',
    25: 'แรม 10 ค่ำ (Waning Crescent Moon)',
    26: 'แรม 11 ค่ำ (Waning Crescent Moon)',
    27: 'แรม 12 ค่ำ (Waning Crescent Moon)',
    28: 'แรม 13 ค่ำ (Waning Crescent Moon) ',
    29: 'แรม 14 ค่ำ (Waning Crescent Moon)',
  }

  //
  return data[phase]
}