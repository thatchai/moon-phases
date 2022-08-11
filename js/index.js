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
    let waterValue
  
    //
    if (!dateInputEl.value) {
      return
    }
    
    //moon rotation
    selectDate = new Date(dateInputEl.value)
    angle = moonFuncGetMoonPhaseRotation(selectDate)
    console.log(angle)
    setMoonRotation(angle)
   
    //moon phase data
    dateArr = dateSplit(dateInputEl.value)
    moonP = moonFuncGetMoonPhase(dateArr[0], dateArr[1], dateArr[2])
    setMoonPhaseName(moonFuncMoonPhaseData(moonP))
    setMoonPhasePercent(angle)
  
    //
    waterValue = waterFuncWaterData(dateArr[0], dateArr[1], dateArr[2])
    setWaterValue(waterValue)
  
    //
    setWaterHeightPercent(waterFuncWaterValuePercent(waterValue))
  }
  
  const dateSplit = (dateStr) => {
    return dateStr.split('-').map(Number)
  }
  
  const setMoonPhaseName = phaseName => {
    moonPhaseNameEl.innerHTML = phaseName
  }

  const setMoonPhasePercent = angle => {
    let percent = 0

    //
    if (angle <= 180) {
      percent = (angle * 100) / 180

    } else {
      percent = (360 - angle) * 100 / 180

    }

    //
    moonPhasePercentEl.innerHTML = percent.toFixed(2) + '%'
  }
  
  const setWaterValue = waterValue => {
    waterValueEl.innerHTML = waterValue
  }
  
  const setWaterHeightPercent = percent => {
    hWaterEl.style.height = percent + '%'
  }
  
  //-- init --
  let moonPhaseNameEl = document.querySelector('.moon-phase-name')
  let moonPhasePercentEl = document.querySelector('.moon-phase-percent')
  let waterValueEl = document.querySelector('.water-value')
  let dateInputEl = document.querySelector('.date-input')
  let searchBtnEl = document.querySelector('.search-btn')
  let hWaterEl = document.querySelector('.h-water')
  
  //
  searchBtnEl.addEventListener('click', onClickSearchBtn)
  
   
  