
//ref data: 
//  https://ngthai.com/science/17715/themoonphases/
//ref img dl: 
//  https://www.moonpage.com/lunarindx.html
//ref img: 
//  https://www.quora.com/What-is-the-difference-between-the-first-quarter-of-the-moon-and-the-last-quarter-of-the-Moon-They-both-look-the-same-to-me

//-- func --
//ref js:
//  https://gist.github.com/endel/dfe6bb2fbe679781948c
const getMoonPhase = (year, month, day) => {
    var c = e = jd = b = 0;

    if (month < 3) {
        year--;
        month += 12;
    }

    ++month;

    c = 365.25 * year;

    e = 30.6 * month;

    jd = c + e + day - 694039.09; //jd is total days elapsed
    
    jd /= 29.5305882; //divide by the moon cycle
    
    b = parseInt(jd); //int(jd) -> b, take integer part of jd
 
    jd -= b; //subtract integer part to leave fractional part of original jd
    
    b = Math.round(jd * 8); //scale fraction from 0-8 and round
     
    if (b >= 8 ) {
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
const getMoonPhaseRotation = date => {
  const cycleLength = 29.5 // days

  const knownNewMoon = new Date('2022-03-02 18:34:00')
  const secondsSinceKnownNewMoon = (date - knownNewMoon) / 1000
  const daysSinceKnownNewMoon = secondsSinceKnownNewMoon / 60 / 60 / 24
  const currentMoonPhasePercentage = (daysSinceKnownNewMoon % cycleLength) / cycleLength

  return 360 - Math.floor(currentMoonPhasePercentage * 360)
}

const setMoonRotation = deg => {
  document.querySelector('.divider').style.transform = `rotate3d(0, 1, 0, ${deg}deg)`

  const hemispheres = document.querySelectorAll('.hemisphere')

  if (deg < 180) {
    // Left
    hemispheres[0].classList.remove('dark')
    hemispheres[0].classList.add('light')

    // Right
    hemispheres[1].classList.add('dark')
    hemispheres[1].classList.remove('light')
  } else {
    // Left
    hemispheres[0].classList.add('dark')
    hemispheres[0].classList.remove('light')

    // Right
    hemispheres[1].classList.remove('dark')
    hemispheres[1].classList.add('light')
  }
}

//ref js:
// https://github.com/mourner/suncalc
const onClickSearchBtn = () => {
  let dateArr
  let moonP
  if (!dateInputEl.value) {
    return
  }
  
  let selectDate = new Date(dateInputEl.value)
  let a = getMoonPhaseRotation(selectDate)
  setMoonRotation(a)
  // console.log('rotation', a)

  //
  dateArr = dateSplit(dateInputEl.value)
  moonP = getMoonPhase(dateArr[0], dateArr[1], dateArr[2])
  // console.log(dateArr)
  // console.log(dateInputEl.value)
  // console.log(moonP)

  // console.log('moon p', moonPhaseData(moonP))

  moonDisplayEl.innerHTML = moonPhaseData(moonP)
}

const dateSplit = (dateStr) => {
  return dateStr.split('-').map(Number)
}

const moonPhaseData = (phase) => {
  let data = {
    0: 'New Moon',
    1: 'Waxing Crescent Moon',
    2: 'Quarter Moon',
    3: 'Waxing Gibbous Moon',
    4: 'Full Moon',
    5: 'Waning Gibbous Moon',
    6: 'Last Quarter Moon',
    7: 'Waning Crescent Moon'
  }


  //
  return data[phase]
}


//-- /func --

//-- init --
let moonDisplayEl = document.querySelector('.moon-display')
let dateInputEl = document.querySelector('.date-input')
let searchBtnEl = document.querySelector('.search-btn')


searchBtnEl.addEventListener('click', onClickSearchBtn)

// console.log(getMoonPhase(2015, 3, 29))
