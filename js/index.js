//
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

//
const onClickSearchBtn = () => {
  let dateArr
  let moonP
  let selectDate
  let angle

  //
  if (!dateInputEl.value) {
    return
  }
  
  //
  selectDate = new Date(dateInputEl.value)
  angle = moonFuncGetMoonPhaseRotation(selectDate)
  setMoonRotation(angle)
 
  //
  dateArr = dateSplit(dateInputEl.value)
  moonP = moonFuncGetMoonPhase(dateArr[0], dateArr[1], dateArr[2])
  moonDisplayEl.innerHTML = moonFuncMoonPhaseData(moonP)
}

const dateSplit = (dateStr) => {
  return dateStr.split('-').map(Number)
}

//-- init --
let moonDisplayEl = document.querySelector('.moon-display')
let dateInputEl = document.querySelector('.date-input')
let searchBtnEl = document.querySelector('.search-btn')

//
searchBtnEl.addEventListener('click', onClickSearchBtn)

 
