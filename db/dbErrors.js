module.exports  = (code) =>  {
  switch(code) {
    case 11000: return { error: 'Email or Login is not unique.' }
  }
}