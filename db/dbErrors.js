module.exports  = (code) =>  {
  switch(code) {
    case 11000: return { error: 'Username is not unique.' }
  }
}